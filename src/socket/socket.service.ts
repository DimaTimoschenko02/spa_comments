import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { SocketSessionService } from '@src/socket-session/socket-session.service';
import { ReplyNotificationType } from '@src/comment/types/reply-notification.type';
import { EventNamesEnum } from '@src/socket/enums/event-names.enum';

@Injectable()
export class SocketService {
  server: Server;

  constructor(private readonly socketSessionService: SocketSessionService) {}

  public async sendNotification(
    eventName: EventNamesEnum,
    userId: number,
    notification: ReplyNotificationType,
  ) {
    const userSockets = await this.socketSessionService.getUserSocket(userId);

    return this.server.to(userSockets).emit(eventName, notification);
  }
}
