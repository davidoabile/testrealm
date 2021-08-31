import { Module } from '@nestjs/common';
//import { DateScalar } from '../common/scalars/date.scalar';
import { StarTrackResolver } from './resolver';
import { Service } from './service';

@Module({
  providers: [StarTrackResolver, Service],
})
export class StarTrackModule { }
