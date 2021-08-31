import { Field, InputType, ObjectType } from "@nestjs/graphql"

@InputType()
export class AddressModel {
    @Field()
    address1: string
    @Field()
    company: string
    @Field({ nullable: true })
    address2?: string
    @Field()
    state: string
    @Field()
    postcode: string
    @Field()
    suburb: string
    @Field()
    phone: string
}

@InputType()
export class ShippingAddress {
    @Field()
    stateName: string
    @Field()
    postcode: string
    @Field()
    street: string
    @Field({ nullable: true })
    street2?: string
    @Field()
    suburb: string
    @Field({ nullable: true })
    email?: string
    @Field({ nullable: true })
    telephone?: string
    @Field({ nullable: true })
    countryCode?: string
    @Field({ nullable: true })
    company?: string
    @Field()
    name: string
}