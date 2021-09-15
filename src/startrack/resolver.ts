/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
//import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateLabelResponse } from 'src/common';
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
  async getStarTrackEstimates(@Args('orders') order: OrderModel) {
    await this.service.prepareOrder(order)
    await this.service.getPrice()
    return "hi"
  }
  @Mutation(returns => CreateLabelResponse)
  async CreateStarTrackLabel(@Args('orders') order: OrderModel, @Args('params') params: DataOption, @HeaderParams() headers: Headers) {
    await this.service.load();
    await this.service.prepareOrder(order, headers)
    await this.service.createLabel(params)
    this.service.realmInstance.close()
    return true
  }

  // @Mutation(returns => NoDataAjaxResponse)
  // async CreateStore(@Args('storeArgs') storeArgs: CreateStoreInput): Promise<NoDataAjaxResponse> {
  //   return await this.service.create_store(storeArgs);
  // }

}
