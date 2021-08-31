import { Module } from '@nestjs/common';
//import { DateScalar } from '../common/scalars/date.scalar';
import { PickScanResolver } from './resolver';
import { Service } from './service';

@Module({
  providers: [PickScanResolver, Service],
})
export class PckNScanModule { }
