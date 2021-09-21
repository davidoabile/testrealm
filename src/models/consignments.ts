import { ObjectId } from "bson"

export class Sender {
    address1: string
    address2: string
    company: string
    phone: string
    postcode: string
    state: string
    suburb: string
}

export class SpecialIntructionsModel {
    _id: ObjectId
    _partition_key: string
    connoteNumber: string
    order_id: string
    recordType: number
    specialInstructions1: string
    specialInstructions2: string
    specialInstructions3: string
}

export class LabelModel {
    _id: ObjectId
    _partition_key: string
    atl_number: string
    con_id: ObjectId
    instructions: SpecialIntructionsModel
    connoteNumber: string
    labelNumber: string
    labelReferenceValue: string
    labelType: string
    order_id: string
    qty: number
    recordType: number
    unitType: string
}
export class ConsignmentModel {
    _id: ObjectId
    _partition_key: string
    label: LabelModel
    connoteNumber: string
    connotePrintedFlag: string
    connoteService: string
    country_code: string
    dangerous_goods: string
    defaultWeightUsedFlag: string
    hdr_seqno: string
    movement: string
    order_id: string
    payerType: string
    productCode: string
    receiverAddress1: string
    receiverAddress2: string
    receiverEmailAddress: string
    receiverLocation: string
    receiverName1: string
    receiverName2: string
    receiverNearestDepot: string
    receiverPhone: string
    receiverPostcode: string
    receiverState: string
    recordType: number
    sender: Sender
    senderAccount: string
    shipping_id: string
    status: string
    store_id: string
    totalDeadWeight: number
    totalNumberOfItems: number
    totalVolume: number
    unitType: string
    version: number
}