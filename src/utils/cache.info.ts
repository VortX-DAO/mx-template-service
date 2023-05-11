import { Constants } from "@multiversx/sdk-nestjs";
import * as crypto from "crypto";

export class CacheInfo {
  key: string = "";
  ttl: number = Constants.oneSecond() * 6;

  static generateCacheInfo(
    abi: string,
    fnName: string,
    argsHash: string
  ): CacheInfo {
    return {
      key: `${abi}:${fnName}:${argsHash}`,
      ttl: Constants.oneSecond() * 6,
    };
  }
}
export function generateHash(data: string): string {
  const hmac = crypto.createHmac("sha256", "MXBI");
  hmac.update(data);
  const hash = hmac.digest("hex").slice(0, 16);
  return hash;
}
