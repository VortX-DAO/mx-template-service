import { Inject, Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ClientProxy } from "@nestjs/microservices";
import { ExampleService } from "src/endpoints/example/example.service";
import { Lock } from "@elrondnetwork/erdnest";
import { CachingService } from "@elrondnetwork/erdnest";
import { CacheInfo } from "src/utils/cache.info";

@Injectable()
export class CacheWarmerService {
  constructor(
    private readonly cachingService: CachingService,
    @Inject('PUBSUB_SERVICE') private clientProxy: ClientProxy,
    private readonly exampleService: ExampleService,
  ) { }

  @Cron(CronExpression.EVERY_10_SECONDS)
  @Lock({ name: 'Example invalidations', verbose: true })
  async handleExampleInvalidations() {
    const examples = await this.exampleService.getAllExamplesRaw();
    await this.invalidateKey(CacheInfo.Examples.key, examples, CacheInfo.Examples.ttl);
  }

  private async invalidateKey<T>(key: string, data: T, ttl: number) {
    await Promise.all([
      this.cachingService.setCache(key, data, ttl),
      this.deleteCacheKey(key),
    ]);
  }

  private deleteCacheKey(key: string) {
    this.clientProxy.emit('deleteCacheKeys', [key]);
  }
}
