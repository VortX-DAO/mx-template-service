/* eslint-disable eol-last */
import {
  AbiRegistry,
  Address,
  SmartContract,
  ResultsParser,
} from '@multiversx/sdk-core/out';
import { CachingService } from '@multiversx/sdk-nestjs';
import { CacheInfo, generateHash } from 'src/utils/cache.info';
import { ApiNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { Injectable } from '@nestjs/common';
import * as gqlModel from '../../graphql/graphql';
import { ApiConfigService } from 'src/common/api-config/api.config.service';
import fs from 'fs';

@Injectable()
export class GeneralService {
  constructor(private readonly apiConfigService: ApiConfigService) { }
  vxdToken(): string {
    return this.apiConfigService.getGeneralQuery('vxdToken');
  }

  lqashToken(): string {
    return this.apiConfigService.getGeneralQuery('lqashToken');
  }
}
