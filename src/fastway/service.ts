import { Injectable } from '@nestjs/common';
import * as Realm from "realm";
import { CreateLabelResponse } from 'src/common';
import { AnyObject } from 'src/models/any.objects';
import { PickNScan } from 'src/PickNScan';
import { DataOption } from 'src/picknscan/dto/data.params';
import { PickNscanRealmAdapter } from 'src/PickNscanRealmAdapter';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
const gm = require('gm');

//Packaging codes
const PACKAGE_PARCEL = 1;
const PACKAGE_SATCHEL_A2 = 4;
const PACKAGE_SATCHEL_A3 = 5;
const PACKAGE_SATCHEL_A4 = 6; //Not available in Australia
const PACKAGE_SATCHEL_A5 = 7;
const IDENTIFIER = 'fastway';


@Injectable()
export class Service extends PickNScan {
  public realmInstance: Realm
  protected userListUrl = '/fastlabel/listusers?'
  protected apiUrl = 'https://au.api.fastway.org/latest';
  protected productId = '';
  protected account: AnyObject = {};
  protected manifest: AnyObject = {};
  private userId: string = ''
  protected consignment: AnyObject = {};
  protected optionalShipping: AnyObject = { Parcel: PACKAGE_PARCEL, Satchel: PACKAGE_SATCHEL_A3 };
  protected shippingOptions = {
    PACKAGE_PARCEL: 'Parcel',
    PACKAGE_SATCHEL_A2: 'Satchel A2',
    PACKAGE_SATCHEL_A3: 'Satchel A3',
    PACKAGE_SATCHEL_A4: 'Satchel A4',
    PACKAGE_SATCHEL_A5: 'Satchel A5',
  };
  protected packaging = 0;
  protected productName = '';
  protected identifier = IDENTIFIER;

  async load(user?: Realm.User<Realm.DefaultFunctionsFactory, any>) {
    this.realmInstance = await PickNscanRealmAdapter(user ?? this.user)
  }
  getUrl(url: string) {
    return `${this.apiUrl}${url}api_key=${this.config.fastway_api_key}`;
  }

  async getPrice() {
    let weight = this.order.total_weight;
    if (this.order.total_weight === 0 && !this.order.total_cubic) {
      weight = 0.1;
    } else if (!this.order.total_weight && this.order.total_cubic == 0) {
      weight = 0.1;
    }
    if (this.order.total_cubic) {
      weight = this.order.total_cubic;
    }

    const url = `/psc/lookup/${this.config.rfcode}/${encodeURIComponent(this.shippingAddress.suburb)}/${this.shippingAddress.postcode}/${weight}?`;
    const res = await this.request(this.getUrl(url))
    console.dir(res, { depth: null })
  }

  async createLabel(data: DataOption): Promise<CreateLabelResponse> {
    const response = new CreateLabelResponse
    try {

      this.options = data;
      await this.createManifest();
      if (data.type) {
        this.packaging = Number(data.type);
      }
      await this.createConnote(data);
      response.ok();
      response.zpl.push(await this.getPdf())
      return response

    } catch (err) {
      console.log(err)
      response.errors = [{ code: "500", message: err.message }]
      return response
    }
  }

  getReceiverDetails() {
    return new URLSearchParams({
      'AccountNo': this.order.receiver_id,
      'ContactName': this.shippingAddress.name,
      'CompanyName': this.shippingAddress.company,
      'Address1': this.shippingAddress.street,
      'Address2': this.shippingAddress.street2,
      'Suburb': this.shippingAddress.suburb,
      'Postcode': this.shippingAddress.postcode,
      'ContactPhone': this.shippingAddress.telephone,
      'ContactEmail': this.shippingAddress.email,
    }).toString();
  }

  getConsignmentItems(data: any) {

    let weight = this.order.total_weight;
    if (this.order.total_weight === 0 && !this.order.total_cubic) {
      weight = 0.1;
    } else if (!this.order.total_weight && this.order.total_cubic == 0) {
      weight = 0.1;
    }


    const items = {
      'Items[0].Reference': this.order.reference ?? this.order.id,
      'Items[0].Quantity': data.qty ?? '1',
      'Items[0].Weight': Math.round(weight / data['qty']).toFixed(2),
      'Items[0].Packaging': this.packaging.toString() ?? PACKAGE_PARCEL.toString(),
      'Items[0].CubicWeight': '0'
    };
    return new URLSearchParams(items).toString();
  }

  getInstruction() {
    let instruction1 = this.order.note ?? '';
    let instruction2 = '', instruction3 = '';


    if (instruction1.length > 50) {
      instruction2 = this.order.note.substring(50, 100);
    }
    if (instruction1.length > 100) {
      instruction3 = this.order.note.substring(101, 150);
    }
    return new URLSearchParams({
      'SpecialInstruction1': instruction1,
      'SpecialInstruction2': instruction2,
      'SpecialInstruction3': instruction3,
    });
  }

  async getPdf() {
    //Stream the PDF
    this.tempFile = this.order.id + '_fast.jpg';
    this.outputFile = this.order.id + '_fast.png';
    this.pdfFile = `downloads/${this.order.id}_fast.pdf`;

    if (this.consignment.LabelPdf) {
      const url = this.consignment.LabelPdf.replace('#your-api-key', this.config.fastway_api_key);

      await this.download(url, this.pdfFile)
      const r = await this.pdfToJpg(this.pdfFile, this.outputFile);
      return await this.toZpl()
    } else {
      throw new Error("Please create a label first. PDF was not found from the consignment object")
    }
  }



  async createConnote(data: any) {
    //Build the url to create the connote
    const url = `/fastlabel/addconsignment?UserID=${this.config.charge_to}&${this.getReceiverDetails()}&${this.getConsignmentItems(data)}&${this.getInstruction()}`;

    const result: AnyObject = await this.request(this.getUrl(url + '&'));

    if (result['result'] && result.result.Items.length > 0) {
      this.consignment = result['result'];
      if (this.consignment['Items'].length > 0) {
        result['trackingNumber'] = this.consignment['Items'][0]['labels'][0]['labelNumber'];
        result['trackingNumbers'] = [];
        for (const item of this.consignment['Items']) {
          const label = item['labels'][0];
          result['connote'] = label['labelNumber'];
          result['trackingNumbers'] = [label['labelNumber']];
          const itemCount = item.length;
          const toSave = {
            'total_cost': this.options['price'],
            'total_gst': 0,
            'article_number': label['labelNumber'],
            'account_number': this.config.charge_to,
            'delivery_to': this.shippingAddress['name'],
            'postcode': this.postcode,
            'order_ref_no': this.order.id,
            'carrier_item_id': this.productId,
            'carrier_item_name': this.productName,
            'color': label['colour'],
            'consignment_id': label['labelNumber'],
            'manifest_id': this.consignment['ManifestID'],
            'shipped_from': this.storeLocation,
            'actual_weight': Math.round(item['parcelWeight']),
            'chargeable_weight': item['parcelWeight'],
            'insurance_amnt': this.order.insurance ?? 0,
            'ordered_items': itemCount ?? 1,
            'order_total': this.order.total,
            'line_number': item['itemID'],
            'method': this.identifier,
            'extra_field': this.extraField,
            'con_sig_no': this.consignment['ConsignmentID'],
            'charging_zone': this.consignment['DestinationRFCode'],
            'con_qty': this.options.qty,
            'dngorus_goods': 'N',
            'transist_cover': 0,
            'cubic_weight': 0,
            'is_open': true,
            'shipping_id': '',
            'extra_fields': '',
            'is_deleted': false,
            'order_comment': this.order.note ?? '',
            'store_id': this.order.store_id
          };
        }

        // this.afterCreateLabel();
        return result;
      } else {
        return { success: false, reason: 'Could not generate Fastway connote :: Error->:: TRACE:' + JSON.stringify(result) };
      }
    } else {
      return { success: false, reason: result["error"] ?? 'Address is not allowed' };
    }
  }

  async createManifest() {
    const result = await this.request(this.getUrl(`/fastlabel/getopenmanifest/${this.userId}?`));
    if (result[0] && result['result'][0]) {
      this.manifest = result['result'][0];
    }
    //console.log(result)
  }
}
