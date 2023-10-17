import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketSessionService } from '@src/socket-session/socket-session.service';

@Injectable()
export class SocketService {
  public server: Server;

  constructor(private readonly socketSessionService: SocketSessionService) {}

  public async sendNotification(
    eventName: string,
    employeeUuid: string,
    notification: { msg: string },
  ) {
    const userSockets =
      await this.socketSessionService.getUserSocket(employeeUuid);

    return this.server.to(userSockets).emit(eventName, notification);
  }
}
