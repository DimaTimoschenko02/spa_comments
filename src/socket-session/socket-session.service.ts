import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SocketSessionService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}
  public async getUserSocket(employeeUuid: string) {
    return await this.cacheManager.get<string[] | undefined>(employeeUuid);
  }

  public async setUserSocket(employeeUuid: string, socketId: string) {
    const existingUuidSockets = await this.getUserSocket(employeeUuid);
    if (existingUuidSockets) {
      return await this.cacheManager.set(employeeUuid, [
        ...existingUuidSockets,
        socketId,
      ]);
    }
    return await this.cacheManager.set(employeeUuid, [socketId]);
  }

  public async removeUserSocket(employeeUuid: string, socketId: string) {
    const existingUuidSockets = await this.getUserSocket(employeeUuid);
    if (existingUuidSockets) {
      const filteredSockets = existingUuidSockets.filter(
        (socket) => socket !== socketId,
      );
      await this.cacheManager.set(employeeUuid, filteredSockets);
    }
  }
}
