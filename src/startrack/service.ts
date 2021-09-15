import { Injectable } from '@nestjs/common';
import * as Realm from "realm";
import { AnyObject } from 'src/models/any.objects';
import { PickNScan } from 'src/PickNScan';
import { DataOption } from 'src/picknscan/dto/data.params';
import { PickNscanRealmAdapter } from 'src/PickNscanRealmAdapter';
import { Dictionary } from 'express-serve-static-core';
import { DeleteConsignment } from 'src/models/until';
import { LABEL_TABLE, LMF_TRANSIT, SHIPPING_LOG, SPECIAL_TABLE, STARTRACK_CONSIGNMENTS } from 'src/constants';
import { ObjectId } from 'bson';
import { identity } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const gm = require('gm');

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
@Injectable()
export class Service extends PickNScan {
  public realmInstance: Realm
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

  async load(user?: Realm.User<Realm.DefaultFunctionsFactory, any>) {
    this.realmInstance = await PickNscanRealmAdapter(user ?? this.user)
  }

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

  async createLabel(data: DataOption) {
    await this.beforeCreate()
    this.dispatchId = this.config.dispatch_id;
    this.setWeight();
    let result: any = { success: false, reason: '' };
    this.printOptions = data;
    // const fileName = this.getCacheDir() . 'zebra/orders/' . this.order['_id'] . '.php';
    // if (file_exists($fileName) && isset(data['reprint'])) {
    //     unlink($fileName);
    // }

    // this.beforeCreate();
    // try {
    // this.manifest = new StarTrack\EServices\MasterFile($this);
    // this.consignment = new StarTrack\EServices\Consignments($this);
    // this.getNearestDepot();

    const isValidAddress = this.validateAddress({
      state: this.shippingAddress['state'],
      suburb: this.shippingAddress['suburb'],
      postcode: this.shippingAddress['postcode']
    });
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
        this.con = this.consignment.get();
        const result = this.getLabel();
        result['trackingNumber'] = conResult['connoteNumber'];
        result['trackingNumbers'] = [];
        result['connotes'] = [];
        // $labelCollection = this.getLabel();
        this.realmInstance.write(() => {
          this.con.map((con: any) => {
            result['trackingNumbers'].push(con['label']['labelNumber']);
            result['trackingNumber'] = con['label']['labelNumber'];
            result['connote'] = con['connoteNumber'];
            result['connotes'].push(con['connoteNumber']);
            if (con['label'] && Array.isArray(con['label'])) {
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
                'actual_weight': Number(actualWeight).toFixed(2),
                'chargeable_weight': Number(this.weight).toFixed(2),
                'insurance_amnt': this.order['insurance'] ? this.order['insurance'] : 0,
                'ordered_items': this.order.total_items,
                'order_total': this.order.total,
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
              this.realmInstance.create(SHIPPING_LOG, data)
            } else {
              result['reason'] = 'Failed to create label. Please try again';
            }
          });
        }
        );
        this.afterCreateLabel();
      } else {
        result = conResult;
      }
    } else {
      this.addressError = isValidAddress['results'];
      result['reason'] = "Your combination of suburb, state & postcode doesn't match. Please review and try again.";
    }
    //} catch (\Exception $e) {
    //    result['reason'] = $e.getMessage();
    // } finally {
    return result;
    // }
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
  deleteConsignment(params: DeleteConsignment) {

  }


  getNearestDepot() {
    const nearestDepo = this.realmInstance.objects(LMF_TRANSIT).filtered("Postcode == $0", this.shippingAddress.postcode).toJSON();
    if (nearestDepo.length) {
      const res = nearestDepo.filter(i => i.SuburbName.trim() == this.shippingAddress['suburb'].toLocaleUpperCase())
      if (res.length) {
        return res[0]['NearestDepot']
      }
      return nearestDepo[0]['NearestDepot'];
    }
    return 'GLD';
  }

  afterCreateLabel() {
  }

  createConsignment(options: any) {
    const response = { success: false, reason: 'Unable to created consignment' };

    // const master = this.getManifest();
    this.setWeight();


    let recordsCreated = false;
    const qty = this.printOptions['qty'] ? this.printOptions['qty'] : 1;
    const id = new ObjectId().toHexString();
    const incrementId = id.substring(id.length - 7); //(int) substr(time(), 3) + rand(1, 9);
    let connoteIncrement = START_CONNOTE + incrementId;
    //Clear and log the old order
    // this.delete(0, (int) $order.getId());
    this.realmInstance.write(() => {
      for (let i = 1; i <= qty; i++) {
        //
        if (this.productCode !== this.serviceEXPCode) {
          const id = new ObjectId().toHexString();
          const incrementId = id.substring(id.length - 7);
          connoteIncrement = START_CONNOTE + incrementId;
        }

        let connote = this.dispatchId + connoteIncrement;

        const address = this.getReceiverDetails()
        const data: any = {
          'connoteNumber': connote,
          'order_id': this.order.id,
          'hdr_seqno': 1,
          'unitType': this.getUnitType(),
          'receiverName1': address.name,
          'receiverName2': address.company,
          'receiverAddress1': address.street,
          'receiverAddress2': address.street2,
          'receiverLocation': address.suburb,
          'receiverState': address.state,
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
          'sender': this.config.charge_to,
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
          response['reason'] = 'Failed to create special instructions label count was zero';
        }

      } else {
        //  this.dbWriter.rollback();
        response['success'] = false;
        response['reason'] = 'Failed to create a consignment';
      }

    })
    return response;
  }


  getLabel() {
    return this.realmInstance.objects(LABEL_TABLE).filtered('order_id == $0').sorted('_id').toJSON();
  }


  createConnLabel(con: any, qty: number) {
    // conCollection.map((con: any) => {
    let labelNumber = `${con['connoteNumber']}${this.productCode}9${con['_id'].substring(con['_id'].length - 4)}`;
    //you can have the same con for express not for air
    // if (this.productCode === this.serviceEXPCode) {
    //   labelNumber = `${conCollection[0]['connoteNumber']}${this.productCode}9${conCollection[0]['_id'].substring(con['_id'].length - 4)}`;
    // }

    let altDefaultNumber = 1;
    let prev = this.realmInstance.objects(LABEL_TABLE).sorted('_id', true).slice(0, 1);
    let lastNumber = prev.length ? prev[0]['atl_number'] : 1
    let atl = lastNumber < 99999999 ? lastNumber + 1 : altDefaultNumber;
    let id = new ObjectId();
    const data = {
      _id: id,
      'connoteNumber': con['connoteNumber'],
      'labelNumber': labelNumber.substring(0, 20),
      'con_id': con['_id'],
      'unitType': this.getUnitType(),
      'order_id': this.order.id,
      'qty': qty,
      'labelReferenceValue': this.order.reference,
      'atl_number': atl,
      'instructions': this.createSpecialInstructions(con, id),
      _partition_key: 'PUBLIC'
    }
    return data

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


  //  createShipment($options, $errorCount = 0 ) {  
  //     $label = $options['labels'];
  //     con = $options['con'];
  //     $notes = this.order['customers']['notes'] ?? '';
  //     $order = [];
  //     $items = [];
  //     $qty =  this.printOptions['qty'] ?? 1;
  //     $weight = round(this.weight / (int) $qty, 3);

  //     for ($i = 1; $i <= (int) $qty; $i++) {
  //         $index = $i -1;
  //         $items[] = [
  //             'item_reference': this.order['seqno'],
  //             'product_id' => con['productCode'],
  //             'length' => 1,
  //             'height' => 1,
  //             'width' => 1,
  //             'weight':weight,
  //             'authority_to_leave' => true,
  //             'partial_delivery_allowed' => false,
  //             'atl_number' => 'C0'. $label[0]['atl_number'],
  //             'packaging_type' => con['unitType'],
  //             'tracking_details'=> [
  //                 'consignment_id' => con['connoteNumber'],
  //                 'article_id':label[0]['labelNumber'],
  //                 'barcode_id':label[0]['labelNumber']
  //             ]
  //         ];
  //     }
  //     $addressLength = strlen(this.shippingAddress['street'] . this.shippingAddress['street2']);
  //     if ($addressLength > 80) {
  //         $address = this.shippingAddress['street'] . this.shippingAddress['street2'];
  //         $address1 = substr($address, 0, 40);
  //         $address2 = substr($address, 40, 80);
  //         $address3 = substr($address, 80, 120);
  //     } else {
  //         $address1 = this.shippingAddress['street'];
  //         $address2 = this.shippingAddress['street2'];
  //         $address3 = '';
  //     }

  //     $specialIntructions = this.order.getShipment().getInstructions() ?? this.order.getNotes();
  //     $special1 = $specialIntructions ? substr($specialIntructions, 0, 20) : '';
  //    // $special2 = substr($specialIntructions, -25);

  //     $order['shipments'] = [
  //         'shipment_reference' => this.order.getId(),
  //         'customer_reference_1':special1 ? $special1 : '',
  //         'customer_reference_2' => '',
  //         'from' => [
  //             'name' => this.senderDetails['company'],
  //             'lines' => [this.senderDetails['address1'], this.senderDetails['address2']],
  //             'suburb' => this.senderDetails['suburb'],
  //             'state' => this.senderDetails['state'],
  //             'postcode' => this.senderDetails['postcode']
  //         ],
  //         'to' => [
  //             'name' => this.shippingAddress['name'],
  //             'business_name' => this.shippingAddress['company'],
  //             'lines' => [$address1, $address2, $address3],
  //             'suburb' => this.shippingAddress['suburb'],
  //             'state' => this.shippingAddress['state'],
  //             'postcode' => this.shippingAddress['postcode'],
  //             'phone' => this.shippingAddress['telephone']
  //         ],
  //         'items':items
  //     ];

  //  // $order = this.options['data'] + $order;

  //     $db = app().get('db');

  //     result = this.ausPostCurl(this.baseURl . 'shipments', $order, 'POST');
  //    try{

  //      if (isset(result['shipments'])) {
  //         $main = result['shipments'][0];
  //         $main['success'] = true;
  //         data = $main + result['shipments'][0]['items'][0];
  //         $shippingId = data['shipment_id'];

  //         if($shippingId) {
  //             $db.rawaql("UPDATE { _key: @key } WITH { shipping_id: @shipping_id, status: 'PROCESSING' } IN star_track_consignments", ["key" => con['_key'],'shipping_id':shippingId ]);

  //         } else {

  //         $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors' => result['shipments'] ]);
  //         }
  //        return data;
  //     } else {        
  //       $error =  result['errors'][0];
  //         if(strpos($error['name'], 'DUPLICATE_') !== false && $errorCount !== 1 ) {
  //             $errorCount++;
  //             if(isset($error['context']['shipment_id'])){
  //                 this.deleteShipments($error['context']['shipment_id']);
  //                 return this. createShipment($options, $errorCount );
  //             } 
  //         }
  //     }

  //     } catch(\Exception $e) {
  //         $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors':e.getMessage() ]);

  //     }         
  //      $db.rawaql("UPDATE { _key: @key } WITH { errors: @errors, status: 'ERROR' } IN star_track_consignments", ["key" => con['_key'],'errors' => result['errors'] ]);
  //      return ['success' => false, 'reason' => result['errors'][0]['message']];


  // }



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

