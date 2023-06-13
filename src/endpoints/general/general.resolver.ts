/* eslint-disable eol-last */
import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import * as gqlModel from '../../graphql/graphql';
import { GeneralService } from './general.service';

@Resolver(() => gqlModel.General)
export class GeneralResolver {
  constructor(private readonly generalService: GeneralService) { }
  @ResolveField()
  getContractAddresses() {
    return this.generalService.getContractAddresses();
  }
}

@Resolver(() => Query)
export class QueryGeneralResolver {
  @Query(() => gqlModel.General)
  general(): gqlModel.General {
    return new gqlModel.General();
  }
}
