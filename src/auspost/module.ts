import { Module } from '@nestjs/common';
import { AuspostResolver } from './resolver';
import { Service } from './service';

@Module({
  providers: [AuspostResolver, Service],
})
export class AuspostModule { }
