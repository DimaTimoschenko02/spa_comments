import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from '@src/comment/repositories/comment.repository';
import { CommentService } from '@src/comment/comment.service';
import { Comment } from '@src/comment/entities/comment.entity';
import { PublicFileModule } from '@src/public-file/public-file.module';
import { CommentController } from '@src/comment/comment.controller';
import { CommentFile } from '@src/comment/entities/comment-file.entity';
import { CommentFileRepository } from '@src/comment/repositories/comment-file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentFile]), PublicFileModule],
  providers: [CommentRepository, CommentService, CommentFileRepository],
  controllers: [CommentController],
})
export class CommentModule {}
