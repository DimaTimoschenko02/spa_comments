import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class SocketSessionService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async getUserSocket(userId: number): Promise<string[]> {
    return await this.cacheManager.get<string[] | undefined>(userId.toString());
  }

  public async setUserSocket(userId: number, socketId: string): Promise<void> {
    const existingSocket = await this.getUserSocket(userId);

    if (existingSocket) {
      return await this.cacheManager.set(userId.toString(), [
        ...existingSocket,
        socketId,
      ]);
    }

    return await this.cacheManager.set(userId.toString(), [socketId]);
  }

  public async removeUserSocket(
    userId: number,
    socketId: string,
  ): Promise<void> {
    const existingSocket = await this.getUserSocket(userId);

    if (existingSocket) {
      const filteredSockets = existingSocket.filter(
        (socket) => socket !== socketId,
      );

      await this.cacheManager.set(userId.toString(), filteredSockets);
    }
  }
}
