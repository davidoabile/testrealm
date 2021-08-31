import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PckNScanModule } from './picknscan/module'
import { FastwayModule } from './fastway/module'
import { StarTrackModule } from './startrack/module'
import { AuspostModule } from './auspost/module'

@Module({
  imports: [
    PckNScanModule,
    FastwayModule,
    StarTrackModule,
    AuspostModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
    }),
  ],
})
export class AppModule { }
