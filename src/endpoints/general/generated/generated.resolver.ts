/* eslint-disable eol-last */
import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import * as gqlModel from '../../../graphql/graphql';
import { GeneratedService } from './generated.service';

@Resolver(() => gqlModel.General)
export class GeneratedResolver {
  constructor(private readonly generalService: GeneratedService) { }
  @ResolveField()
  getContractAddresses() {
    return this.generalService.getContractAddresses();
  }
}

@Resolver(() => Query)
export class QueryGeneratedResolver {
  @Query(() => gqlModel.General)
  general(): gqlModel.General {
    return new gqlModel.General();
  }
}
