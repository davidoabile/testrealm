import { Module } from '@nestjs/common';
//import { DateScalar } from '../common/scalars/date.scalar';
import { FastwayResolver } from './resolver';
import { Service } from './service';

@Module({
  providers: [FastwayResolver, Service],
})
export class FastwayModule { }
