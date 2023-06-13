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
  getContractAddresses(): gqlModel.Contract[] {
    const data = this.apiConfigService.getContractAddresses();
    return Object.keys(data).map((key) => {
      const contract = new gqlModel.Contract();
      (contract.name = key), (contract.address = data[key][0]);
      return contract;
    });
  }
}
