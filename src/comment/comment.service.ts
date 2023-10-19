import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentRepository } from '@src/comment/repositories/comment.repository';
import { PublicFileService } from '@src/public-file/public-file.service';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { CreateCommentBodyDto } from '@src/comment/dtos/create-comment-body.dto';
import { isEmpty, isNil, omit } from 'lodash';
import { Comment } from '@src/comment/entities/comment.entity';
import { FindOptionsRelations } from 'typeorm/find-options/FindOptionsRelations';
import { UpdateCommentDto } from '@src/comment/dtos/update-comment.dto';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { GetCommentsQueryDto } from '@src/comment/dtos/get-comments-query.dto';
import { GetCommentsResponseDto } from '@src/comment/dtos/get-comments-response.dto';
import { LimitOffsetDto } from '@src/common/dtos/limit-offset.dto';
import { SocketService } from '@src/socket/socket.service';
import { EventNamesEnum } from '@src/socket/enums/event-names.enum';
import { MappedCommentDto } from '@src/comment/dtos/mapped-comment.dto';
import { GetCommentByIdDto } from '@src/comment/dtos/get-comment-by-id.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly publicFileService: PublicFileService,
    private readonly socketService: SocketService,
  ) {}

  public async createFile(file: Express.Multer.File): Promise<PublicFile> {
    return this.publicFileService.uploadFile(file);
  }

  public async getCommentById(id: number): Promise<GetCommentByIdDto> {
    const { parentComment } = await this.isExistsComment(id, {
      parentComment: { files: true },
    });

    const comment = await this.commentRepository.getCommentById(id);

    return {
      parentComment: parentComment
        ? {
            text: parentComment.text,
            id: parentComment.id,
            filesCount: parentComment.files.length,
          }
        : null,
      comment: (await this.mapComments([comment]))[0],
    };
  }

  public async createComment(
    userId: number,
    { comment }: CreateCommentBodyDto,
  ): Promise<void> {
    const files = await this.getFilesFromComment(comment);

    await this.commentRepository.save({
      homePage: comment.homePage,
      text: comment.text,
      files,
      user: { id: userId },
    });
  }

  public async createReplyComment(
    userId: number,
    parentCommentId: number,
    { comment }: CreateCommentBodyDto,
  ): Promise<void> {
    const parentComment = await this.isExistsComment(parentCommentId, {
      childComments: true,
      user: { profile: { avatar: true } },
    });
    const user = parentComment.user;
    const files = await this.getFilesFromComment(comment);

    const newComment = await this.commentRepository.manager.transaction(
      async (entityManager) => {
        const newComment = await entityManager.save(Comment, {
          homePage: comment.homePage,
          text: comment.text,
          files,
          user: { id: userId },
          parentComment,
        });

        parentComment.childComments = [
          ...parentComment.childComments,
          newComment,
        ];

        await entityManager.save(Comment, parentComment);

        return newComment;
      },
    );

    const userAvatarLink = await this.publicFileService.getFileLink(
      user.profile.avatar.key,
    );

    await this.socketService.sendNotification(
      EventNamesEnum.COMMENT_REPLY,
      userId,
      {
        user: {
          name: user.profile.name,
          avatar: userAvatarLink,
        },
        message: {
          text: newComment.text,
        },
      },
    );
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

  public async deleteComment(commentId: number, userId: number): Promise<void> {
    const comment = await this.isExistsComment(commentId, { user: true });

    if (comment.user.id !== userId)
      throw new ForbiddenException('CanNotDeleteNotYouOwnComments');

    await this.commentRepository.delete(commentId);
  }

  public async updateComment(
    userId: number,
    commentId: number,
    comment: UpdateCommentDto,
  ): Promise<void> {
    const isExistsComment = await this.isExistsComment(commentId, {
      user: true,
    });

    if (userId !== isExistsComment.user.id)
      throw new ForbiddenException('CanNotChangeNotYouOwnComments');

    isExistsComment.files = await this.getFilesFromComment(comment);
    isExistsComment.homePage = comment.homePage ?? null;
    isExistsComment.text = comment.text ?? null;

    const toUpdate = await this.commentRepository.preload(isExistsComment);

    await this.commentRepository.save(toUpdate);
  }

  public async getCommentReplies(
    commentId: number,
    query: LimitOffsetDto,
  ): Promise<GetCommentsResponseDto> {
    const [comments, count] = await this.commentRepository.getCommentReplies(
      commentId,
      query,
    );

    return { comments: await this.mapComments(comments), count };
  }

  public async getComments(
    query: GetCommentsQueryDto,
  ): Promise<GetCommentsResponseDto> {
    const [comments, count] = await this.commentRepository.getComments(query);

    return { comments: await this.mapComments(comments), count };
  }

  private async getFilesFromComment(comment: {
    files?: PublicFileDto[];
  }): Promise<PublicFile[]> {
    return isEmpty(comment.files)
      ? []
      : await Promise.all(
          comment.files.map((file) =>
            this.publicFileService.getFileById(file.id),
          ),
        );
  }

  private async mapComments(comments: Comment[]): Promise<MappedCommentDto[]> {
    return Promise.all(
      comments.map(async (comment) => ({
        ...comment,
        files: await Promise.all(
          comment.files.map(async (file) => ({
            ...file,
            key: await this.publicFileService.getFileLink(file.key),
          })),
        ),
        user: {
          ...omit(comment.user, ['profile']),
          ...comment.user.profile,
          avatar: await this.publicFileService.getFileLink(
            comment.user.profile.avatar.key,
          ),
        },
      })),
    );
  }
}
