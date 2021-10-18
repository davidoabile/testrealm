import { Injectable } from '@nestjs/common';
import * as Realm from "realm";
import { PickNScan } from 'src/PickNScan';
import { DataOption } from 'src/picknscan/dto/data.params';
import { DeleteConsignment } from 'src/models/until';
import { LABEL_TABLE, LMF_TRANSIT, SHIPPING_LOG, SPECIAL_TABLE, STARTRACK_CONSIGNMENTS } from 'src/constants';
import { ObjectId } from 'bson';
import { LabelResponse } from 'src/models/label.response';
import { CreateLabelResponse, ErrorModel, NoDataAjaxResponse } from 'src/common';
import { ConsignmentModel } from 'src/models/consignments';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const gm = require('gm');
const Handlebars = require("handlebars");
/*
Email-address: david@nutritionwarehouse.com.au
Name: David Oabile

Key(username): 5a8d1af4-e2f6-4550-b038-0f7577c67102
Password(secret): x85a0a2a4245c2cfa5f9

Testbed URL: https://digitalapi.auspost.com.au/test/shipping/v1
Testbed URL (for use with PostMan collection): https://digitalapi.auspost.com.au/test

Products: eParcel and International
Account-Number: 2014295696

Products: Same Day Services
Account-Number: 3014295696

Products: ST Premium and ST Express
Account-Number: 04295696
*/
const IDENTIFIER = 'startrack';
const START_CONNOTE = 20000000;
const VERSION = '1.0.1'

@Injectable()
export class Service extends PickNScan {
  public serviceCode = 'PRM';
  public serviceEXPCode = 'EXP';
  public connoteService = 'PRM';
  public productCode = 'FPP';
  protected account = "1001972075";
  protected username = "99ff097f-44ff-4f0f-bfbd-4221eb8cafee";
  protected password = "xe238acac4d41d7e169f";
  protected merchantAccount: any = {};

  public nearestDepo: any = {};

  protected addressError = '';
  /*     * @var Shipping\StarTrack\EServives\MasterFile manifest startrack manifest * */
  protected manifest = null;
  protected manifestData: any = {};
  protected consignment = null;
  protected optionsShippingTypes = {
    'FPP1': '1KG Fixed Price Premium',
    'FPP3': '3KG Fixed Price Premium',
    'FPP5': '5KG Fixed Price Premium',
    'FPP10': '10KG Fixed Price Premium',
    'EXP': 'EXPRESS',
  };
  protected con: any = {};
  public dispatchId = 'RDYZ';
  protected printOptions: any = {};
  protected loginOptions: any = {};
  productNames: any[] = [];

  baseURl = 'https://digitalapi.auspost.com.au/shipping/v1/';
  testUrl = 'https://digitalapi.auspost.com.au/test/shipping/v1/'

  /** @var StarTrack\Eservices\Eservices eService StarTrack API client */
  protected eService = null;



  async setup() {
    if (this.config.is_sandbox) {
      // this.baseURl = this.testUrl;
    }
    this.loginOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Account-Number': this.config.charge_to,
        'Authorization': `Basic ${this.base64_encode(this.config.username + ':' + this.config.password)}`
      }
    };


    await this.getAccount();
    if (this.merchantAccount['postage_products']) {
      for (const product of this.merchantAccount['postage_products']) {
        delete product.contract;
        delete product.shipment_features

        this.productNames[product['product_id']] = product;
      }
      delete this.merchantAccount['postage_products'];
    }

  }

  async getAccount() {
    this.merchantAccount = await this.ausPostCurl(`${this.baseURl}accounts/${this.config.charge_to}`);

  }

  async ausPostCurl(url: string, params: any = {}, method: any = 'GET') {
    try {
      return await this.request(url, params, method, this.loginOptions.headers);
    } catch (err) {
      console.log(url)
      console.log(err)
    }
  }


  /**
     * Call starTrack API to verify the address
     * @return array 
     */
  validateAddress(address: any) {
    const params = new URLSearchParams(address);
    return this.ausPostCurl(`${this.baseURl}address?${params.toString()}`);
  }

  setWeight() {
    let weight = this.order.total_weight;
    if (this.order.total_weight === 0 && !this.order.total_cubic) {
      weight = 0.1;
    } else if (!this.order.total_weight && this.order.total_cubic == 0) {
      weight = 0.1;
    }
    if (this.order.total_cubic) {
      weight = this.order.total_cubic;
    }
    this.weight = weight
  }

  async getPrice() {
    this.setWeight()
    const shipimentQuote = {
      shipments: [
        {
          from: {
            suburb: "COOMERA",
            state: "QLD",
            postcode: "4209"
          },
          to: {
            suburb: "COOMERA",
            state: "QLD",
            postcode: "4209"
          },
          items: [
            {
              length: 5,
              height: 1,
              packaging_type: 'CTN',
              width: 1,
              weight: 5
            }
          ]
        }
      ]
    }
    const prices = await this.ausPostCurl(`${this.baseURl}prices/shipments`, shipimentQuote, 'POST')
    console.dir(prices, { depth: null })
  }

  async createLabel(data: DataOption): Promise<CreateLabelResponse> {
    await this.beforeCreate()
    this.dispatchId = this.config.dispatch_id;
    this.setWeight();
    let result = new CreateLabelResponse()
    this.printOptions = data;

    const isValidAddress = await this.validateAddress({
      state: this.shippingAddress['stateName'],
      suburb: this.shippingAddress['suburb'],
      postcode: this.shippingAddress['postcode']
    });
    try {
      if (isValidAddress['found'] === true) {
        const actualWeight = this.weight;
        this.isAddressValid = true;
        if (data['type']) {
          //this.con = this.consignment.get();
          if (data['type'].includes('FPP')) {
            switch (data['type']) {
              case 'FPP3':
                this.weight = 3;
                break;
              case 'FPP5':
                this.weight = 5;
                break;
              case 'FPP10':
                this.weight = 10;
                break;
              default:
                this.weight = 1;
            }
            this.productCode = 'FPP';
          } else {
            this.serviceCode = data['type'];
            this.connoteService = this.serviceEXPCode;
            this.productCode = this.serviceEXPCode;
          }
          //  this.consignment.update(['productCode' => this.productCode, 'connoteService' => this.connoteService], con['seqno']);
        }

        data['sender'] = this.senderDetails;
        data['store_id'] = this.store['_id'];
        const conResult = this.createConsignment(data);
        if (conResult['success'] === true) {
          this.con = conResult.data;
          //const result = this.getLabel();
          result['trackingNumber'] = conResult['connoteNumber'];
          result['trackingNumbers'] = [];
          result['connotes'] = [];
          // $labelCollection = this.getLabel();
          this.realmInstance.write(() => {
            this.con.map((con: any, i: number) => {
              result['trackingNumbers'].push(con['label']['labelNumber']);
              result['trackingNumber'] = con['label']['labelNumber'];
              result['connote'] = con['connoteNumber'];
              result['connotes'].push(con['connoteNumber']);
              if (con['label']) {
                const dataToSave = {
                  'total_cost': data['price'],
                  'article_number': con['label']['labelNumber'],
                  'delivery_to': this.shippingAddress['name'],
                  'postcode': this.postcode,
                  'consignment_id': con['connoteNumber'],
                  'order_ref_no': this.order.id,
                  'charge_code': this.productCode,
                  'total_article_in_con': data['qty'] ? data['qty'] : 1,
                  'manifest_id': con['hdr_seqno'],
                  'charging_zone': con['receiverNearestDepot'],
                  'shipped_from': this.storeLocation,
                  'actual_weight': Number(actualWeight),
                  'chargeable_weight': Number(this.weight),
                  'insurance_amnt': this.order['insurance'] ? this.order['insurance'] : 0,
                  'ordered_items': this.order.total_items,
                  'order_total': Number(this.order.total),
                  'con_sig_no': con['_key'],
                  'extra_field': this.extraField,
                  'method': IDENTIFIER,
                  'dngorus_goods': 'N',
                  'transist_cover': 0,
                  'cubic_weight': 0,
                  'is_open': true,
                  'is_deleted': false,
                  'con_qty': 1,
                  'order_comment': this.order['note'],
                  'store_id': this.order['store_id'],
                  '_partition_key': 'PUBLIC'
                };
                this.realmInstance.create(SHIPPING_LOG, dataToSave)
                result = result.ok();
                result.zpl.push(this.getZpl(con, i + 1))
              } else {
                result.errors.push({ code: "400", message: "Failed to create label. Please try again" });
              }
            });
          }
          );
          this.afterCreateLabel();
        } else {
          result.errors = conResult.errors;
        }
      } else {
        this.addressError = isValidAddress['results'];
        result.errors.push({ code: "400", message: "Your combination of suburb, state & postcode doesn't match. Please review and try again." });
      }
    } catch (err) {
      console.log(err)
      result.errors.push({ code: "400", message: err.message });
    }
    console.log(result)
    return result;

  }


  getZpl(con: any, current: number) {
    const d = new Date();
    const fs = require('fs');
    const tpl = `${__dirname}/../../tpl/startrak.tpl`;
    let buf = fs.readFileSync(tpl);

    const template = Handlebars.compile(buf.toString());
    const id = new ObjectId(con._id).getTimestamp().getTime().toString();
    return template(
      {
        SERVICE_CODE: this.serviceCode === this.serviceEXPCode ? `^FO20,22^GB190,80,80^FS^FO24,24^FR^AC^FD${this.serviceCode}^FS` : `^FO20,22^FD${this.serviceCode}^FS`,
        CONNOTE: con['connoteNumber'],
        AUTHORITY_TO_LEAVE: con['label']['atl_number'],
        COMPANY_NAME: this.senderDetails['company'],
        COMPANY_PHONE: this.senderDetails['phone'],
        COMPANY_ADDRESS1: this.senderDetails['address1'],
        COMPANY_ADDRESS2: this.senderDetails['address2'],
        COMPANY_STATE: this.senderDetails['state'],
        COMPANY_CITY: this.senderDetails['suburb'],
        COMPANY_POSTCODE: this.senderDetails['postcode'],
        DELIVERY_COMPANY: con['receiverName2'],
        DELIVERY_NAME: con['receiverName1'],
        ADDRESS1: con['receiverAddress1'],
        ADDRESS2: con['receiverAddress2'],
        DELIVERY_PHONE: con['receiverPhone'],
        DELIVERY_CITY: con['receiverLocation'].toLocaleUpperCase(),
        DELIVERY_STATE: this.getState(con['receiverState']),
        DELIVERY_POSTCODE: con['receiverPostcode'],
        BARCODE: `${this.serviceCode}>5${con['receiverPostcode']}>6${con['receiverNearestDepot']}`,
        QRCODE: this.printQrCode(con),
        ORDER_NUMBER: con['label']['specialInstructions1'],
        ORDER_COMMENTS1: con['label']['specialInstructions2'],
        ORDER_COMMENTS2: con['label']['specialInstructions3'],
        NOT_BEFORE: con['label']['notBefore'],
        NOT_AFTER: con['label']['notAfter'],
        ORDER_DATE: ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear(),
        QTY: con['unitType'],
        ITEMS: con['totalNumberOfItems'],
        WEIGHT: con['totalDeadWeight'],
        CUBIC: con['totalVolume'],
        COUNTRY: con['country_code'],
        ROUTING: con['receiverNearestDepot'],
        SECONDARY_PORT: (this.serviceCode !== this.serviceEXPCode) ? this.nearestDepo['SecondaryPort'] : '',
        VERSION: VERSION,
        CURRENTLABLECOUNT: current,
        LONG_BARCODE: `${con['connoteNumber'].substring(0, 4)}>5${con['connoteNumber']}>6${this.productCode}9>5${id.padStart(4, '0').slice(-4)}`
      }
    );
  }

  printQrCode(consignment: any) {
    const d = new Date();
    const label = consignment.label;
    // const data = {
    //     'receiverSuburb' : consignment['receiverLocation'].padStart(30, ''),
    //     'receiverPostcode' : consignment['receiverPostcode'].padStart(4, ''),
    //     'connotenumber' : consignment['connoteNumber'].padStart(12, ''),
    //     'labelNumber' : label['labelNumber'],
    //     'productCode' : this.serviceCode.padStart(3, ''),
    //     'payerAccount' : consignment['senderAccount'].padStart(8, ''),
    //     'senderAccount' : consignment['senderAccount'].padStart(8, ''),
    //     'qty' : consignment['totalNumberOfItems'].padStart(4, ''),
    //     'weight' : consignment['totalDeadWeight'].padStart(5, ''),
    //     'cubic' :consignment['totalVolume'].padStart(5, ''),
    //     'dispatchDate' : ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear(),
    //     'receiverName' : consignment['receiverName1'].padStart(40, ''),
    //     'receiverName2' : consignment['receiverName2'].padStart(40, ''),
    //     'unitType' :  consignment['unitType'].padStart(3, ''),
    //     'receiverNearestDepot' : this.serviceCode === this.serviceEXPCode ? consignment['receiverNearestDepot'].padStart(4, '') : this.nearestDepo['SecondaryPort'].padStart(40, ''),
    //     'receiverAddress1' : consignment['receiverAddress1'].padStart(40, ''),
    //     'receiverAddress2' : consignment['receiverAddress2'].padStart(40, ''),
    //     'receiverPhone' : consignment['receiverPhone'].padStart(12, ''),
    //     'dangerous_goods' : consignment['dangerous_goods'],
    //     'movement' : consignment['movement'],
    //     'notBefore' : label['notBefore'].padStart(12, ''),
    //     'notAfter' : label['notAfter'].padStart(12, ''),
    //     'atlNumber' : label['atl_number'].padStart(10, ''),
    //     'raNumber' : label['labelReferenceValue'].padStart(10, ''),
    // };
    const data = [
      consignment['receiverLocation'].padStart(30, ''),
      consignment['receiverPostcode'].padStart(4, ''),
      consignment['connoteNumber'].padStart(12, ''),
      label['labelNumber'],
      this.serviceCode.padStart(3, ''),
      consignment['senderAccount'].padStart(8, ''),
      consignment['senderAccount'].padStart(8, ''),
      consignment['totalNumberOfItems'].toString().padStart(4, ''),
      consignment['totalDeadWeight'].toString().padStart(5, ''),
      consignment['totalVolume'] ?? ''.toString().padStart(5, ''),
      ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear(),
      consignment['receiverName1'].padStart(40, ''),
      consignment['receiverName2'].padStart(40, ''),
      consignment['unitType'].toString().padStart(3, ''),
      this.serviceCode === this.serviceEXPCode ? consignment['receiverNearestDepot'].padStart(4, '') : this.nearestDepo['SecondaryPortPRM'] ?? ''.padStart(4, ''),
      consignment['receiverAddress1'].padStart(40, ''),
      consignment['receiverAddress2'] ?? ''.padStart(40, ''),
      consignment['receiverPhone'] ?? ''.padStart(12, ''),
      consignment['dangerous_goods'],
      consignment['movement'],
      label['notBefore'] ?? ''.padStart(12, ''),
      label['notAfter'] ?? ''.padStart(12, ''),
      label['atl_number'].toString().padStart(10, ''),
      label['labelReferenceValue'] ?? ''.padStart(10, ''),
    ];

    return data.join('');
  }

  getReceiverDetails() {
    return {
      'account': this.order.receiver_id,
      'name': this.shippingAddress.name,
      'company': this.shippingAddress.company,
      'street': this.shippingAddress.street,
      'street2': this.shippingAddress.street2,
      'suburb': this.shippingAddress.suburb,
      'postcode': this.shippingAddress.postcode,
      'phone': this.shippingAddress.telephone,
      'email': this.shippingAddress.email,
      'state': this.shippingAddress.stateName,
    }
  }
  deleteConsignment(_params: DeleteConsignment) {
    //we are already in the write 
    const cons = this.realmInstance.objects<any>(STARTRACK_CONSIGNMENTS).filtered("order_id == $0", this.order.id);
    cons.map((con) => {
      if (con.label && con.label.instructions) {
        this.realmInstance.delete(con.label.instructions)
      }
      if (con.label) {
        this.realmInstance.delete(con.label)
      }
      this.realmInstance.delete(con);

    })

  }

  async beforeCreate() {
    this.realmInstance.write(() => {
      const manifest = this.realmInstance.objects(SHIPPING_LOG).filtered("order_ref_no == $0", this.order.id);
      manifest.map(i => {
        const item = i.toJSON();
        this.realmInstance.delete(i)

      });

      this.deleteConsignment(null)
    })
  }

  getNearestDepot() {
    const nearestDepo = this.realmInstance.objects(LMF_TRANSIT).filtered("Postcode == $0", this.shippingAddress.postcode).toJSON();
    if (nearestDepo.length) {
      const res = nearestDepo.filter(i => i.SuburbName.trim() == this.shippingAddress['suburb'].toLocaleUpperCase())
      if (res.length) {
        this.nearestDepo = res[0];
        return res[0]['NearestDepot']
      }
      this.nearestDepo = nearestDepo[0];
      return nearestDepo[0]['NearestDepot'];
    }
    return 'GLD';
  }

  afterCreateLabel() {
  }

  /*
    * The encoded Receiver State for an Australian address or
    * “9” when the consignment is destined to New Zealand using a valid Premium
    * product. Refer to the section entitled Supported StarTrack Products & features of
    * service for detail.
    */

  getStates(st: string, isNz?: boolean) {
    let state = '';
    const states = {
      'NSW': '2',
      'VIC': '3',
      'QLD': '4',
      'SA': '5',
      'WA': '6',
      'TAS': '7',
      'NT': '0',
      'ACT': 'A',
    };
    if (isNz) {
      state = '9';
    } else if (states[st.toLocaleUpperCase()]) {
      state = states[st.toLocaleUpperCase()]
    } else {
      throw new Error(`State ${st} is not supported by Startrack`)
    }
    return state;
  }

  getState(id: string) {
    let state = '';
    const states = {
      '2': 'NSW',
      '3': 'VIC',
      '4': 'QLD',
      '5': 'SA',
      '6': 'WA',
      '7': 'TAS',
      '0': 'NT',
      'A': 'ACT',
      '9': 'NZ'
    };
    if (states[id.toUpperCase()]) {
      state = states[id.toUpperCase()];
    }
    return state;
  }

  genUniqueId() {
    return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
  }

  createConsignment(options: any) {
    const response = { success: false, data: [], errors: [] };

    // const master = this.getManifest();
    this.setWeight();


    let recordsCreated = false;
    const qty = this.printOptions['qty'] ? this.printOptions['qty'] : 1;
    const id = this.genUniqueId().toString();
    const incrementId = id.slice(- 7); //(int) substr(time(), 3) + rand(1, 9);
    let connoteIncrement = START_CONNOTE + Number(incrementId);
    //Clear and log the old order
    // this.delete(0, (int) $order.getId());
    this.realmInstance.write(() => {
      for (let i = 1; i <= qty; i++) {
        // const id = new ObjectId(con._id).getTimestamp().getTime().toString();
        if (this.productCode !== this.serviceEXPCode) {
          const id = this.genUniqueId().toString();
          const incrementId = id.slice(-7);
          connoteIncrement = START_CONNOTE + Number(incrementId);
        }

        let connote = this.dispatchId + connoteIncrement;

        const address = this.getReceiverDetails()
        const data: any = {
          'connoteNumber': connote,
          'order_id': this.order.id,
          'hdr_seqno': '1',
          'unitType': this.getUnitType(),
          'receiverName1': address.name,
          'receiverName2': address.company,
          'receiverAddress1': address.street,
          'receiverAddress2': address.street2,
          'receiverLocation': address.suburb,
          'receiverState': this.getStates(address.state),
          'receiverPostcode': address['postcode'],
          'receiverPhone': address['phone'],
          'senderAccount': this.config.charge_to,
          'totalNumberOfItems': Number(options['qty']) < 1 ? 1 : Number(options['qty']),
          'receiverNearestDepot': this.getNearestDepot(),
          'connoteService': this.connoteService,
          'totalDeadWeight': this.weight > 0 ? this.weight : 1,
          'totalVolume': null,
          'receiverEmailAddress': address.email,
          'country_code': address['countryCode'],
          'productCode': this.productCode,
          'sender': this.order.store_address,
          'store_id': this.order.store_id
        };
        data['shipping_id'] = '';
        data['version'] = 2;
        data['status'] = 'PENDING';

        data._partition_key = "PUBLIC";
        data._id = new ObjectId();
        data.label = this.createConnLabel(data, qty)

        const consignment = this.realmInstance.create<any>(STARTRACK_CONSIGNMENTS, data, Realm.UpdateMode.Modified);

        if (consignment._id) {
          recordsCreated = true
          response.data.push(consignment.toJSON());
        }
        if (this.productCode == this.serviceEXPCode) {
          break;
        }
      }
      if (recordsCreated) {
        const labels: any = {}

        recordsCreated = true;
        const labelCollection = this.getLabel()

        if (labelCollection.length) {
          labelCollection.map(label => {
            if (label.instructions && label.instructions['specialInstructions1']) {
              labels[label['connoteNumber']] = label['connoteNumber'];
            }
          });
          response['connoteNumber'] = Object.keys(labels);
          response['success'] = true;
        } else {
          response['success'] = false;
          response.errors.push({ code: "406", message: 'Failed to create special instructions label count was zero' });
        }

      } else {
        //  this.dbWriter.rollback();
        response['success'] = false;
        response.errors.push({ code: "406", message: 'Failed to create a consignment' });
      }

    })
    return response;
  }


  getLabel() {
    return this.realmInstance.objects(LABEL_TABLE).filtered('order_id == $0', this.order.id).sorted('_id').toJSON();
  }


  createConnLabel(con: any, qty: number) {
    // const con_id = con._id.getTimestamp().getTime().toString();
    // conCollection.map((con: any) => {
    let labelNumber = `${con['connoteNumber']}${this.productCode}9${this.genUniqueId().toString().slice(-4)}`;
    //$labelNumber = $con['connoteNumber'] . $this->starTrack->productCode . '9' . substr(str_pad($con['_key'], 4, '0', STR_PAD_LEFT), -4);
    //you can have the same con for express not for air
    const items: any[] = []
    for (let i = 1; i <= qty; i++) {
      if (this.productCode === this.serviceEXPCode && qty > 1) {
        labelNumber = `${con['connoteNumber']}${this.productCode}9${this.genUniqueId().toString().slice(-4)}`;
      }
      let altDefaultNumber = 1;
      let prev = this.realmInstance.objects(LABEL_TABLE).sorted('_id', true).slice(0, 1);
      let lastNumber = prev.length ? prev[0]['atl_number'] : 1
      let atl = lastNumber < 99999999 ? lastNumber + 1 : altDefaultNumber;
      let id = new ObjectId();
      items.push({
        _id: id,
        'connoteNumber': con['connoteNumber'],
        'labelNumber': labelNumber.substring(0, 20),
        'con_id': con['_id'],
        'unitType': this.getUnitType(),
        'order_id': this.order.id,
        'qty': qty,
        'labelReferenceValue': this.order.reference,
        'atl_number': atl.toString().padStart(8, '0'),
        'instructions': this.createSpecialInstructions(con, id),
        _partition_key: 'PUBLIC'
      })
    }
    return items

  }


  createSpecialInstructions(con: any, id: ObjectId) {

    const specialIntructions = this.order.note;
    const special1 = specialIntructions.substring(0, 25);
    let special2 = '';
    let special3 = '';
    if (specialIntructions.length > 25) {
      special2 = specialIntructions.substring(25, 50)
    }
    if (specialIntructions.length > 50) {
      special3 = specialIntructions.substring(50, 75)
    }

    return {
      'connoteNumber': con['connoteNumber'],
      'order_id': this.order.id,
      'specialInstructions1': special1,
      'specialInstructions2': special2,
      'specialInstructions3': special3,
      _id: new ObjectId(),
      _partition_key: 'PUBLIC',

    };

  }




  getUnitType() {
    let unitType = 'CTN';
    if (this.weight <= 5) {
      if (unitType != this.isBagSupportedCodes()) {
        unitType = this.isCartonSupportedCodes();
      }
    }
    return unitType ? 'BAG' : unitType;
  }

  isBagSupportedCodes() {

    let supported = [
      'P2', 'APT', 'ARL', 'FPA', 'FPH', 'FPP', 'ITL', 'PHD', 'PRM', 'RE2', 'RET', 'SE1', 'SE2', 'SE3', 'TSE'
    ];

    if (supported.includes(this.serviceCode)) {
      return 'SAT';
    }
    return 'BAG';
  }

  isCartonSupportedCodes() {
    const supported = ['P2', 'APT', 'ARL', 'EXP', 'FPA', 'FPH', 'FPP', 'ITL', 'PHD', 'PRM', 'RE2', 'RET', 'SE1', 'SE2', 'SE3', 'TSE'];

    if (supported.includes(this.serviceCode)) {
      return 'CTN';
    }
    return 'BAG';
  }


  async createShipment(): Promise<NoDataAjaxResponse> {
    const consignments = this.realmInstance.objects<any>(STARTRACK_CONSIGNMENTS).filtered("shipping_id == '' AND status == 'PENDING'").sorted("_id");
    let order: any = {};
    const items = [];
    const res = new NoDataAjaxResponse()
    consignments.map((con: ConsignmentModel) => {
      const label = con.label

      const qty = con.totalNumberOfItems;
      const weight = (con.totalDeadWeight / qty).toFixed(3);


      items.push({
        'item_reference': con.order_id,
        'product_id': con['productCode'],
        'length': 1,
        'height': 1,
        'width': 1,
        'weight': weight,
        'authority_to_leave': true,
        'partial_delivery_allowed': false,
        'atl_number': `C0${label['atl_number']}`,
        'packaging_type': con['unitType'],
        'tracking_details': {
          'consignment_id': con['connoteNumber'],
          'article_id': label['labelNumber'],
          'barcode_id': label['labelNumber']
        }
      });


      // const addressLength = (con.receiverAddress1 + con.receiverAddress2).length;
      // let address1 = con.receiverAddress1;
      // let address2 = con.receiverAddress2;
      // let address3 = '';

      // if (addressLength > 80) {
      //   const address = con.receiverAddress1 + ' ' + con.receiverAddress2;
      //   address1 = address.slice(0, 40);
      //   address2 = address.slice(40, 80);
      //   address3 = address.slice(80, 120);
      // }

      order['shipments'] = {
        'shipment_reference': con.order_id,
        'customer_reference_1': label.instructions.specialInstructions1 ?? '',
        'customer_reference_2': label.instructions.specialInstructions2 ?? '',
        'from': {
          'name': con.sender.company,
          'lines': [con.sender.address1, con.sender.address1],
          'suburb': con.sender.suburb,
          'state': con.sender.state,
          'postcode': con.sender.postcode
        },
        'to': {
          'name': con.receiverName1,
          'business_name': con.receiverName2,
          'lines': [con.receiverAddress1, con.receiverAddress2],
          'suburb': con.receiverLocation,
          'state': this.getState(con.receiverState),
          'postcode': con.receiverPostcode,
          'phone': con.receiverPhone
        },
        'items': items
      };

    });
    const result = await this.ausPostCurl(`${this.baseURl}shipments`, order, 'POST')
    console.dir(result, { depth: null })

    return res
    /*
    
   // $order = this.options['data'] + $order;

      $db = app().get('db');

      result = this.ausPostCurl(this.baseURl . 'shipments', $order, 'POST');
     try{

       if (isset(result['shipments'])) {
          $main = result['shipments'][0];
          $main['success'] = true;
          data = $main + result['shipments'][0]['items'][0];
          $shippingId = data['shipment_id'];

          if($shippingId) {
              $db.rawaql("UPDATE { _key: @key } WITH { shipping_id: @shipping_id, status: 'PROCESSING' } IN star_track_consignments", ["key" => con['_key'],'shipping_id':shippingId ]);

          } else {

          $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors' => result['shipments'] ]);
          }
         return data;
      } else {        
        $error =  result['errors'][0];
          if(strpos($error['name'], 'DUPLICATE_') !== false && $errorCount !== 1 ) {
              $errorCount++;
              if(isset($error['context']['shipment_id'])){
                  this.deleteShipments($error['context']['shipment_id']);
                  return this. createShipment($options, $errorCount );
              } 
          }
      }

      } catch(\Exception $e) {
          $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors':e.getMessage() ]);

      }         
       $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors' => result['errors'] ]);
       return ['success' => false, 'reason' => result['errors'][0]['message']];
*/

  }



  // async createConnote(data: any) {
  //   //Build the url to create the connote
  //   const url = `/fastlabel/addconsignment?UserID={this.config.charge_to}&{this.getReceiverDetails()}&{this.getConsignmentItems(data)}&{this.getInstruction()}`;
  //   console.log(url)

  //   const result: AnyObject = await this.request(this.getUrl(url + '&'));

  //   if (result['result'] && result.result.Items.length > 0) {
  //     this.consignment = result['result'];

  //     console.log(this.consignment)
  //     if (this.consignment['Items'].length > 0) {
  //       await this.getPdf();
  //       result['trackingNumber'] = this.consignment['Items'][0]['labels'][0]['labelNumber'];
  //       result['trackingNumbers'] = [];
  //       for (const item of this.consignment['Items']) {
  //         const label = item['labels'][0];
  //         result['connote'] = label['labelNumber'];
  //         result['trackingNumbers'] = [label['labelNumber']];
  //         const itemCount = item.length;
  //         const toSave = {
  //           'total_cost': this.options['price'],
  //           'total_gst': 0,
  //           'article_number': label['labelNumber'],
  //           'delivery_to': this.shippingAddress['name'],
  //           'postcode': this.postcode,
  //           'order_ref_no': this.order.id,
  //           'carrier_item_id': this.productId,
  //           'carrier_item_name': this.productName,
  //           'color': label['colour'],
  //           'consignment_id': label['labelNumber'],
  //           'manifest_id': this.consignment['ManifestID'],
  //           'shipped_from': this.storeLocation,
  //           'actual_weight': Math.round(item['parcelWeight']),
  //           'chargeable_weight': item['parcelWeight'],
  //           'insurance_amnt': this.order.insurance ?? 0,
  //           'ordered_items': itemCount ?? 1,
  //           'order_total': this.order.total,
  //           'line_number': item['itemID'],
  //           'method': this.identifier,
  //           'extra_field': this.extraField,
  //           'con_sig_no': this.consignment['ConsignmentID'],
  //           'charging_zone': this.consignment['DestinationRFCode'],
  //           'con_qty': this.options.qty,
  //           'dngorus_goods': 'N',
  //           'transist_cover': 0,
  //           'cubic_weight': 0,
  //           'is_open': true,
  //           'shipping_id': '',
  //           'extra_fields': '',
  //           'is_deleted': false,
  //           'order_comment': this.order.note ?? '',
  //           'store_id': this.order.store_id
  //         };
  //       }

  //       // this.afterCreateLabel();
  //       return result;
  //     } else {
  //       return { success: false, reason: 'Could not generate Fastway connote :: Error.:: TRACE:' + JSON.stringify(result) };
  //     }
  //   } else {
  //     return { success: false, reason: result["error"] ?? 'Address is not allowed' };
  //   }
  // }

}

