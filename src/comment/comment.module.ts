import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from '@src/comment/repositories/comment.repository';
import { CommentService } from '@src/comment/comment.service';
import { Comment } from '@src/comment/entities/comment.entity';
import { PublicFileModule } from '@src/public-file/public-file.module';
import { CommentController } from '@src/comment/comment.controller';
import { SocketModule } from '@src/socket/socket.module';
import { CacheModule } from '@src/cache/cache.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PublicFileModule,
    SocketModule,
    CacheModule,
  ],
  providers: [CommentRepository, CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
