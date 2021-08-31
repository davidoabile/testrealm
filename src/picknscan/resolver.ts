/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Service } from './service';

//const pubSub = new PubSub();

@Resolver(of => PickScanResolver)
export class PickScanResolver {
  constructor(private readonly service: Service) { }

  // @Query(returns => KeyValuePairsResponse)
  // async ageBracket(): Promise<KeyValuePairsResponse> {
  //   return await this.service.age_bracket()
  // }

  @Query(returns => String)
  hello() {
    return "hi"
  }

  // @Mutation(returns => NoDataAjaxResponse)
  // async CreateStore(@Args('storeArgs') storeArgs: CreateStoreInput): Promise<NoDataAjaxResponse> {
  //   return await this.service.create_store(storeArgs);
  // }

}
