import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { SocketService } from '@src/socket/socket.service';
import { SocketSessionService } from '@src/socket-session/socket-session.service';
import { TokenJwtService } from '@src/token-jwt/token-jwt.service';

@WebSocketGateway({
  allowEIO3: true,
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*', // i dont have frontend so didnt set origin
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly socketService: SocketService,
    private readonly socketSessionService: SocketSessionService,
    private readonly tokenService: TokenJwtService,
  ) {}

  public afterInit() {
    this.socketService.server = this.server;
  }

  public async handleConnection(client: Socket) {
    const token = client.handshake.query.token as string;
    const userId = this.getUserId(token);

    await this.socketSessionService.setUserSocket(userId, client.id);
  }

  public async handleDisconnect(client: Socket) {
    const token = client.handshake.query.token as string;
    const userId = this.getUserId(token);

    await this.socketSessionService.removeUserSocket(userId, client.id);
  }

  private getUserId(token: string): number {
    return +this.tokenService.decodeToken(token).sub;
  }
}
