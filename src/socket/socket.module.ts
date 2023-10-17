import { Global, Module } from '@nestjs/common';

import { SocketSessionModule } from '@src/socket-session/socket-session.module';
import { SocketService } from './socket.service';

@Global()
@Module({
  imports: [SocketSessionModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
