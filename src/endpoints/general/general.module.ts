/* eslint-disable eol-last */
import { Module } from '@nestjs/common';
import { ApiConfigModule } from 'src/common/api-config/api.config.module';
import { DynamicModuleUtils } from 'src/utils/dynamic.module.utils';
import { GeneralService } from './general.service';
import { GeneralResolver, QueryGeneralResolver } from './general.resolver';

@Module({
  imports: [ApiConfigModule, DynamicModuleUtils.getCachingModule()],
  providers: [GeneralService, GeneralResolver, QueryGeneralResolver],
  exports: [GeneralService, GeneralResolver, QueryGeneralResolver],
})
export class GeneralModule { }
