import { Controller, Logger } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { ElrondCachingService } from "@elrondnetwork/erdnest";

@Controller()
export class PubSubListenerController {
  private logger: Logger;

  constructor(
    private readonly cachingService: ElrondCachingService,
  ) {
    this.logger = new Logger(PubSubListenerController.name);
  }

  @EventPattern('deleteCacheKeys')
  async deleteCacheKey(keys: string[]) {
    for (const key of keys) {
      this.logger.log(`Deleting local cache key ${key}`);
      await this.cachingService.deleteLocal(key);
    }
  }
}
