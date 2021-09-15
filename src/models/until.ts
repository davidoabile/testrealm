import { ObjectId } from "bson"

export enum Carriers {
    STARTRACK = 'startrack',
    AUSPOST = 'auspost',
    FASTWAY = 'fastway'
}

export class DeleteConsignment {
    _id: ObjectId
    method: string
    shipping_id: string
    con_sig_no: string
}