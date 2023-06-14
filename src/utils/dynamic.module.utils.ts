import { ElasticModule, ElasticModuleOptions, CachingModule, CachingModuleOptions, ApiModule, ApiModuleOptions, ERDNEST_CONFIG_SERVICE } from "@multiversx/sdk-nestjs";
import { DynamicModule, Provider } from "@nestjs/common";
import { ClientOptions, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { ApiConfigModule } from "src/common/api-config/api.config.module";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { SdkNestjsConfigServiceImpl } from "src/common/api-config/sdk.nestjs.config.service.impl";

export class DynamicModuleUtils {
  static getElasticModule(): DynamicModule {
    return ElasticModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => new ElasticModuleOptions({
        url: apiConfigService.getElasticUrl(),
        customValuePrefix: 'api',
      }),
      inject: [ApiConfigService],
    });
  }

  static getCachingModule(): DynamicModule {
    return CachingModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => {
        const redisUri = apiConfigService.getRedisUrl().split(":");
        const redisHost = redisUri[0];
        const redisPort = redisUri.length > 1 ? parseInt(redisUri[1]) : 6379;

        return new CachingModuleOptions({
          url: redisHost,
          port: redisPort,
          poolLimit: apiConfigService.getPoolLimit(),
          processTtl: apiConfigService.getProcessTtl(),
        })
      },
      inject: [ApiConfigService],
    });
  }

  static getApiModule(): DynamicModule {
    return ApiModule.forRootAsync({
      imports: [ApiConfigModule],
      useFactory: (apiConfigService: ApiConfigService) => new ApiModuleOptions({
        axiosTimeout: apiConfigService.getAxiosTimeout(),
        rateLimiterSecret: apiConfigService.getRateLimiterSecret(),
        serverTimeout: apiConfigService.getServerTimeout(),
        useKeepAliveAgent: apiConfigService.getUseKeepAliveAgentFlag(),
      }),
      inject: [ApiConfigService],
    });
  }

  static getNestJsApiConfigService(): Provider {
    return {
      provide: ERDNEST_CONFIG_SERVICE,
      useClass: SdkNestjsConfigServiceImpl,
    };
  }

  static getPubSubService(): Provider {
    return {
      provide: 'PUBSUB_SERVICE',
      useFactory: (apiConfigService: ApiConfigService) => {
        const redisUri = apiConfigService.getRedisUrl().split(":");
        const redisHost = redisUri[0];
        const redisPort = redisUri.length > 1 ? parseInt(redisUri[1]) : 6379;
        const clientOptions: ClientOptions = {
          transport: Transport.REDIS,
          options: {
            host: redisHost,
            port: redisPort,
            retryDelay: 1000,
            retryAttempts: 10,
            retryStrategy: () => 1000,
          },
        };

        return ClientProxyFactory.create(clientOptions);
      },
      inject: [ApiConfigService],
    };
  }
}
