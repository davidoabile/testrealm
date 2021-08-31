import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { AddressModel, ShippingAddress } from './address';

@InputType()
export class OrderModel {
    @Field({ description: "System generated order id" })
    id: string
    @Field({ description: "Order notes - shipping notes " })
    note?: string
    @Field(() => Float, { defaultValue: 0, nullable: true, description: "total weight for the order" })
    total_weight: number
    @Field(() => Float, { defaultValue: 0, nullable: true, description: "total cubic in meters for the order" })
    total_cubic: number
    @Field({ description: "Store this order belongs to" })
    store_id: string
    @Field(() => Float, { description: 'Order total' })
    total: number
    @Field({ nullable: true, description: "Order ref e.g. order number, custom order number - if missing order.id will be used" })
    reference?: string
    @Field({ description: "Number of items in an order" })
    total_items: number
    @Field(() => Float, { nullable: true, description: "Insurance changed to customers if applicable" })
    insurance?: number
    @Field({ description: "Company where the order is dispatched from" })
    store_address: AddressModel
    @Field({ description: "Delivery address" })
    customer_address: ShippingAddress
    @Field({ nullable: true, description: "Receiver id - e.g. cusotmer number" })
    receiver_id: string
}