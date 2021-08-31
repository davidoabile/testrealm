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
export class FastwayResolver {
  constructor(private readonly service: Service) { }

  // @Query(returns => KeyValuePairsResponse)
  // async ageBracket(): Promise<KeyValuePairsResponse> {
  //   return await this.service.age_bracket()
  // }

  @Query(returns => String)
  helloFastway() {
    return "hi"
  }


  @Query(returns => String)
  fastWayEstimates(@Args('orders') order: OrderModel) {
    this.service.prepareOrder(order).getPrice()
    return "hi"
  }
  @Mutation(returns => CreateLabelResponse)
  CreateFastWayLabel(@Args('orders') order: OrderModel, @Args('params') params: DataOption, @HeaderParams() headers: Headers) {
    return this.service.prepareOrder(order, headers).createLabel(params)
  }

  // @Mutation(returns => NoDataAjaxResponse)
  // async CreateStore(@Args('storeArgs') storeArgs: CreateStoreInput): Promise<NoDataAjaxResponse> {
  //   return await this.service.create_store(storeArgs);
  // }

}
