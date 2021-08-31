
import { ArgsType, Field } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ArgsType()
export class QueryParamsArgs {
    @Field({ nullable: true, description: "Returns the elements that come after the specified cursor." })
    after?: string
    @Field({ nullable: true, description: 'Returns the elements that come before the specified cursor.' })
    before?: string
    @Field({ defaultValue: 12, nullable: true, description: "Returns up to the first n elements from the list." })
    first?: number
    @Field({ nullable: true, description: 'Returns up to the last n elements from the list.' })
    last?: number
    @Field((type) => ObjectId, { nullable: true, description: "Returns the elements belonging to an id" })
    id?: ObjectId
    @Field((type) => String, { nullable: true, description: "Dynamic search" })
    search?: string
}

@ArgsType()
export class QueryParamsCustomArgs extends QueryParamsArgs {
    @Field({ nullable: true, description: "Custom query filters" })
    query?: string
    @Field({ nullable: true, description: 'Date item was modified' })
    updated_at?: Date
    @Field({ nullable: true, description: 'Default sort is ID' })
    sort_key?: string
    @Field({ nullable: true, description: 'Reverse the order of the list' })
    reverse?: boolean
}