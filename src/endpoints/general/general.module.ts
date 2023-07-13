/* eslint-disable eol-last */
import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/common/api-config/api.config.module';
import { DynamicModuleUtils } from 'src/utils/dynamic.module.utils';
import { GeneralService } from './general.service';
import { GeneralResolver, QueryGeneralResolver } from './general.resolver';
import { GeneratedService } from './generated/generated.service';
import { GeneratedResolver, QueryGeneratedResolver } from './generated/generated.resolver';

@Module({
  imports: [ApiConfigModule, DynamicModuleUtils.getCachingModule()],
  providers: [GeneratedService, GeneratedResolver, QueryGeneratedResolver, GeneralService, GeneralResolver, QueryGeneralResolver],
  exports: [GeneratedService, GeneratedResolver, QueryGeneratedResolver, GeneralService, GeneralResolver, QueryGeneralResolver],
})
export class GeneralModule { }
