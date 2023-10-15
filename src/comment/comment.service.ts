import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '@src/comment/repositories/comment.repository';
import { PublicFileService } from '@src/public-file/public-file.service';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { CreateCommentBodyDto } from '@src/comment/dtos/create-comment-body.dto';
import { isEmpty, isNil } from 'lodash';
import { CommentFileRepository } from '@src/comment/repositories/comment-file.repository';
import { Comment } from '@src/comment/entities/comment.entity';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly commentFileRepository: CommentFileRepository,
    private readonly publicFileService: PublicFileService,
  ) {}

  public async createFile(file: Express.Multer.File): Promise<PublicFile> {
    return this.publicFileService.uploadFile(file);
  }

  public async createComment(
    userId: number,
    { comment, parentCommentId }: CreateCommentBodyDto,
  ) {
    const parentComment = parentCommentId
      ? await this.isExistsComment(parentCommentId, { childComments: true })
      : null;

    const files = isEmpty(comment.files)
      ? []
      : await Promise.all(
          comment.files.map((file) =>
            this.publicFileService.getFileById(file.id),
          ),
        );

    const newComment = await this.commentRepository.save({
      homePage: comment.homePage,
      text: comment.text,
      files,
      user: { id: userId },
    });

    if (parentComment) {
      parentComment.childComments = [
        ...parentComment.childComments,
        newComment,
      ];
      await this.commentRepository.save(parentComment);
    }

    //TODO move all into migration
  }

  public async isExistsComment(
    id: number,
    relations?: FindOptionsRelations<Comment>,
  ): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations,
    });

    if (isNil(comment)) throw new NotFoundException('CommentNotFound');

    return comment;
  }
}
