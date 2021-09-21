import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class LabelResponse {
    @Field()
    success: boolean
    @Field({ nullable: true })
    reason?: string
    @Field(() => [String], { nullable: true })
    zpl?: string[]
    @Field({ nullable: true })
    trackingNumber?: string
    @Field(() => [String], { nullable: true })
    trackingNumbers?: string[]
    @Field({ nullable: true })
    connote?: string
    @Field(() => [String], { nullable: true })
    connotes?: string[]
}