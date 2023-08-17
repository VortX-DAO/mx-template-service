import { Module } from '@nestjs/common';
import '@multiversx/sdk-nestjs/lib/src/utils/extensions/array.extensions';
import '@multiversx/sdk-nestjs/lib/src/utils/extensions/date.extensions';
import '@multiversx/sdk-nestjs/lib/src/utils/extensions/number.extensions';
import '@multiversx/sdk-nestjs/lib/src/utils/extensions/string.extensions';
import { join } from 'path';
import { EndpointsServicesModule } from './endpoints/endpoints.services.module';
import { DynamicModuleUtils } from './utils/dynamic.module.utils';
import { LoggingModule } from '@multiversx/sdk-nestjs';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AddressCustomScalar } from './graphql/scalars/AddressCustom';
import { HexCustomScalar } from './graphql/scalars/HexCustom';
import { MxEnumCustomScalar } from './graphql/scalars/MxEnumCustom';

@Module({
  imports: [
    LoggingModule,
    EndpointsServicesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
      playground: true,
      introspection: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },
    }),
  ],
  providers: [
    DynamicModuleUtils.getNestJsApiConfigService(),
    AddressCustomScalar,
    HexCustomScalar,
    MxEnumCustomScalar,
  ],
  exports: [EndpointsServicesModule],
})
export class PublicAppModule { }
