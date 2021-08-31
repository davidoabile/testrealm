import { Injectable } from '@nestjs/common';
import * as Realm from "realm";
import { PickNScan } from 'src/PickNScan';
import { PickNscanRealmAdapter } from 'src/PickNscanRealmAdapter';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment


@Injectable()
export class Service extends PickNScan {
  public realmInstance: Realm

  async load(partition: string, user?: Realm.User<Realm.DefaultFunctionsFactory, any>) {
    this.realmInstance = await PickNscanRealmAdapter(partition, user ?? this.user)
  }

}
