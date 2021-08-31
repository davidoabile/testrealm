
// https://docs.mongodb.com/realm/node/relationships
import * as Realm from 'realm';
import { REALM_API_KEY, REALM_APP_ID } from './constants';
import { AddressModel, ShippingAddress } from './models/address';
import { OrderLines } from './models/order.lines';
import axios from 'axios'
import { AnyObject } from './models/any.objects';
import { Dictionary } from 'express-serve-static-core';
import { OrderModel } from './models/order';
import { DataOption } from './picknscan/dto/data.params';
import { Headers } from './headers.decorators.params';
import * as stream from 'stream';
import { promisify } from 'util';
import { createWriteStream } from 'fs';
import { fromPath } from "pdf2pic";

//import { RecipeSchema } from '../shopper/models/recipe.model';
const app = new Realm.App({ id: REALM_APP_ID });




export abstract class PickNScan {

  public user: Realm.User<Realm.DefaultFunctionsFactory, any>;
  protected basePath = null;
  protected savePath = '';
  protected sslForce = true;
  protected config = new Headers;
  protected tempFile = 'conv.jpg';
  protected outputFile = 'output.jpg';
  protected pdfFile = '';
  protected options: DataOption = new DataOption;
  protected order: OrderModel;
  protected store = [];
  protected shippingState = 'QLD';
  protected weight = 0;
  protected postcode = '';
  protected isAddressValid = false;
  protected adminUser = 0;
  protected adminUserInfo = [];
  protected storeConfig = [];
  protected logData = [];
  protected storeLocation = 'default';
  protected extraField = null;

  /**
    *
    * @var Shipping shipping shipping Object
    */
  protected shipping = null;

  protected orderedItems: OrderLines[] = [];

  /** @params senderDetails[] address */
  protected senderDetails = new AddressModel;

  protected shippingAddress = new ShippingAddress;


  constructor() {
    this.handleLogin();
  }

  async handleLogin() {
    try {
      const credentials = Realm.Credentials.serverApiKey(REALM_API_KEY);
      await app.logIn(credentials);
      this.user = app.currentUser!
    } catch (err) {
      console.error("Failed to log in:", err)
    }
  }

  prepareOrder(order: OrderModel, headers?: Headers) {
    this.order = order;
    if (headers) {
      this.config = headers
    }
    this.shippingAddress = order.customer_address;
    this.senderDetails = order.store_address;
    return this;
  }


  /**
  * Fetch data from remote server using curl
  * @param string $url remote url
  * @param array $options params to pass to the remote server
  * @param string $method Request method POST, DELETE,GET,PUT
  * @param array $headers Extra headers to add to curl
  * @return array
  */
  async request(url: string, options?: any, method?: 'GET' | 'POST', headers?: Dictionary<string>) {
    const params: AnyObject = {
      method: method ?? "GET",
      url,
    }
    if (method == 'POST') {
      params.data = options
    }

    if (headers) {
      params.headers = headers
    }
    return (await axios(params)).data;
  }

  async download(url: string, out_path: string) {
    const finished = promisify(stream.finished);

    const writer = createWriteStream(out_path);
    return axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    }).then(async response => {
      response.data.pipe(writer);
      return finished(writer);
    });
  }

  async pdfToJpg(source_pdf: string, saveFilename: string) {


    const options = {
      density: 300,
      saveFilename,
      savePath: "downloads/",
      format: "jpg",
      width: 600,
      height: 1100
    };
    const storeAsImage = fromPath(`${__dirname}/../${source_pdf}`, options);
    const pageToConvertAsImage = 1;
    this.outputFile = `${saveFilename}.${pageToConvertAsImage}.jpg`
    storeAsImage(pageToConvertAsImage).then((resolve) => {
      return resolve;
    });
  }

  async toZpl() {
    // Synchronous pngjs usage
    const fs = require('fs');
    const JPG = require('jpeg-js');
    const rgbaToZ64 = require('zpl-image').rgbaToZ64;
    console.log(`${__dirname}/../downloads/${this.outputFile}`)
    let buf = fs.readFileSync(`${__dirname}/../downloads/${this.outputFile}`);
    let jpg = JPG.decode(buf);
    let res = rgbaToZ64(jpg.data, jpg.width, { black: 53 });

    // res.length is the uncompressed GRF length.
    // res.rowlen is the GRF row length.
    // res.z64 is the Z64 encoded string.
    return `^GFA,${res.length},${res.length},${res.rowlen},${res.z64}`;
  }
}