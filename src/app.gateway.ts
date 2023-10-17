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
    origin: '*',
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
    console.log('connected');
    const token = client.handshake.query.token as string;
    const userId = await this.getUserId(token);
    console.log({ auth: client.handshake.query.token, userId });
    await this.socketSessionService.setUserSocket(userId, client.id);
  }

  public async handleDisconnect(client: Socket) {
    const token = client.handshake.query.token as string;
    const userId = await this.getUserId(token);

    await this.socketSessionService.removeUserSocket(userId, client.id);
  }

  private async getUserId(token: string) {
    console.log({ decoded: this.tokenService.decodeToken(token) });
    return this.tokenService.decodeToken(token).sub;
  }
}
