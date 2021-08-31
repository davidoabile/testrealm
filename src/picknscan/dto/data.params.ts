import { Field, Float, InputType } from "@nestjs/graphql"
@InputType()
export class DataOption {
    @Field(() => Float)
    price: number
    @Field()
    qty: number
    @Field({ nullable: true })
    type?: string
}