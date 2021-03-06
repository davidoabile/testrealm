import { Field, ObjectType } from "@nestjs/graphql";

export interface IAjaxResponseErrors {
    code: string;
    message: string;
}


export interface IAjaxResponse<T> {
    /* Returns true or false on success */
    success: boolean;
    /* We don't return normal http error but we use this
      to pass custom status codes */
    status: string;
    /** Http error code */
    code: number;
    /**
     * This holds data from the server
     * Sometimes we return status codes e.g. 200 without
     * body or if there is an error message
     */
    data?: T;
    /** A list of error messages */
    errors?: IAjaxResponseErrors[];
}


@ObjectType()
export class ErrorModel implements IAjaxResponseErrors {
    @Field()
    code: string;
    @Field()
    message: string;
}


@ObjectType()
export class NoDataAjaxResponse implements IAjaxResponse<string> {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: [ErrorModel];

    ok?() {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        return this
    }
}

@ObjectType()
export class StringAjaxResponse implements IAjaxResponse<string> {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: [ErrorModel];
    @Field({ nullable: true })
    data?: string;
    ok?(str?: string) {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        this.data = str
        return this
    }
}


@ObjectType()
export class CreateLabelResponse {
    @Field()
    success: boolean = false;
    @Field()
    status: string = "NOT FOUND";
    @Field()
    code: number = 404;
    @Field((type) => [ErrorModel], { nullable: true })
    errors?: ErrorModel[] = [];
    @Field(() => [String], { defaultValue: [] })
    zpl?: string[] = []
    @Field({ nullable: true })
    trackingNumber?: string
    @Field(() => [String], { defaultValue: [] })
    trackingNumbers?: string[] = []
    @Field({ nullable: true })
    connote?: string
    @Field(() => [String], { defaultValue: [] })
    connotes?: string[] = [];

    ok?() {
        this.success = true;
        this.status = 'OK';
        this.code = 200
        return this
    }


}

export class TrackingDetails {
    // 	The consignment ID, generated by the merchant, to be assigned to the item.
    consignment_id: string
    // The article ID, generated by the merchant, to be assigned to the item.
    article_id: string
    // 	Mandatory	String	30
    // barcode_id	The barcode ID, generated by the merchant, to be assigned to the item.
    barcode_id: string
}

export class ShipmentAddressModel {
    name: string;
    business_name: string
    lines: string[]
    suburb: string
    state: string;
    postocde: string;
    country: string = 'AU'
    phone: string;
    email: string
    delivery_instructions?: string
}

export class Items {
    //A unique reference for the item, generated by the merchant. - limit 50
    item_reference: string
    //The Australia Post code representing the postage product for the item.
    product_id: string
    item_description?: string
    // 	The length of the parcel in centimetres. If volumetric pricing applies then this is mandatory. 
    // Alternatively, you can use the cubic_volume field. You cannot specify both length/width/height and cubic_volume.
    length?: number
    // The width of the parcel in centimetres. If volumetric pricing applies then this is mandatory. 
    // Please refer to the length field for more information.
    width?: number
    // The height of the parcel in centimetres. If volumetric pricing applies then this is mandatory. 
    // Please refer to the length field for more information.
    height?: number
    // The volume of the item in cubic metres. If volumetric pricing applies, then volume is mandatory. 
    // To specify volume, you can use the cubic_volume field or the length/width/height fields, but not both. 
    // Note that the cubic_volume field is only available for StarTrack products and New Zealand Commercial products.
    cubic_volume: number
    // The parcel???s weight in kilograms. This must not be specified for flat-rate return shipments 
    // (movement_type = RETURN). However, it is mandatory for normal (outbound) shipments 
    // (movement_type = DESPATCH) and zonal returns (movement_type = RETURN). Your contract with Australia Post 
    // (not your API call) determines whether a return shipment has zonal pricing or flat-rate pricing. 
    // Note that most returns contracts are flat-rate.
    weight?: number
    // Whether the item contains dangerous goods, generated by the merchant.
    contains_dangerous_goods: boolean = false
    // If the goods being sent are dangerous but are permitted to be transported by air, set this value to 'true'.
    transportable_by_air: boolean = false
    // Whether the item can be left in a safe place on delivery without receiving a signature. 
    // This is optional for domestic shipments (and defaults to false), but must not be specified for international shipments.
    authority_to_leave: boolean = false
    // The packaging type for this item. Some example values are: CTN, PAL, SAT, BAG, ENV, ITM, JIF, SKI
    // Note, for StarTrack products, the packaging type (refereed to as a unit type by StarTrack) is mandatory
    packaging_type?: string
    // Authority to Leave (ATL) authorisation code. If this field is provided, it must begin with C and be followed by a 9 digit number.
    atl_number: string
}


export class ShipmentsModel {
    //A unique reference for the shipment, generated by the merchant. limit 50
    shipment_reference: string
    //	A merchant specified array of references for the shipment.
    sender_references: string[]
    // Description of the goods. This is printed on the auxiliary label. A maximum of 3 lines, each with a maximum of 40 characters.
    goods_descriptions?: string[]
    //Despatch Date of a shipment. Date should be supplied in the following format yyyy-MM-dd.
    //Note - Despatch Date cannot be more than 14 days in future, and cannot be in the past.
    despatch_date: string;
    //Whether the recipient of the shipment will receive tracking notification email. 
    //The email address of the receiver must be provided if the email_tracking_enabled field is set to true.
    email_tracking_enabled: boolean = true;
    from: ShipmentAddressModel
    to: ShipmentAddressModel
    items: Items[]
}