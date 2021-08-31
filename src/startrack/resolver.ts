/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { HeaderParams, Headers } from 'src/headers.decorators.params';
import { OrderModel } from 'src/models/order';
import { DataOption } from 'src/picknscan/dto/data.params';
import { Service } from './service';

//const pubSub = new PubSub();

@Resolver()
export class StarTrackResolver {
  constructor(private readonly service: Service) { }

  // @Query(returns => KeyValuePairsResponse)
  // async ageBracket(): Promise<KeyValuePairsResponse> {
  //   return await this.service.age_bracket()
  // }


  @Query(returns => String)
  getStarTrackEstimates(@Args('orders') order: OrderModel) {
    this.service.prepareOrder(order).getPrice()
    return "hi"
  }
  @Mutation(returns => Boolean)
  CreateStarTrackLabel(@Args('orders') order: OrderModel, @Args('params') params: DataOption, @HeaderParams() headers: Headers) {
    this.service.prepareOrder(order, headers).createLabel(params)
    return true
  }

  // @Mutation(returns => NoDataAjaxResponse)
  // async CreateStore(@Args('storeArgs') storeArgs: CreateStoreInput): Promise<NoDataAjaxResponse> {
  //   return await this.service.create_store(storeArgs);
  // }

}
