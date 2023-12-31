import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from '@src/comment/comment.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { GetCurrentUserId } from '@src/common/decorators/get-current-user-id.decorator';
import { CreateCommentBodyDto } from '@src/comment/dtos/create-comment-body.dto';
import { UpdateCommentDto } from '@src/comment/dtos/update-comment.dto';
import { IdDto } from '@src/common/dtos/id.dto';
import { GetCommentsQueryDto } from '@src/comment/dtos/get-comments-query.dto';
import { GetCommentsResponseDto } from '@src/comment/dtos/get-comments-response.dto';
import { LimitOffsetDto } from '@src/common/dtos/limit-offset.dto';
import { ParseFile } from '@src/common/pipes/parse-file.pipe';
import { commentFileFilter } from '@src/common/utils/comment-file-filter.util';
import { GetCommentByIdDto } from '@src/comment/dtos/get-comment-by-id.dto';
import { NotFoundError } from 'rxjs';
import { NotFoundDto } from '@src/common/dtos/not-found-dto';

@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('file')
  @ApiOkResponse({ type: PublicFileDto })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', { fileFilter: commentFileFilter }))
  public async createFile(
    @UploadedFile(ParseFile) file: Express.Multer.File,
  ): Promise<PublicFile> {
    return this.commentService.createFile(file);
  }

  @Post()
  @ApiNoContentResponse()
  public async createComment(
    @Body() createCommentDto: CreateCommentBodyDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    return this.commentService.createComment(userId, createCommentDto);
  }

  @Post('reply/:id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundDto, description: 'CommentNotFound' })
  public async createReplyComment(
    @Body() createCommentDto: CreateCommentBodyDto,
    @Param() { id: parentCommentId }: IdDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    return this.commentService.createReplyComment(
      userId,
      parentCommentId,
      createCommentDto,
    );
  }

  @Put(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundError, description: 'CommentNotFound' })
  public async updateComment(
    @Body() comment: UpdateCommentDto,
    @GetCurrentUserId() userId: number,
    @Param() { id: commentId }: IdDto,
  ): Promise<void> {
    return this.commentService.updateComment(userId, commentId, comment);
  }

  @Get()
  @ApiOkResponse({ type: GetCommentsResponseDto })
  public async getComments(
    @Query() query: GetCommentsQueryDto,
  ): Promise<GetCommentsResponseDto> {
    return this.commentService.getComments(query);
  }

  @Get('replies/:id')
  @ApiOkResponse({ type: GetCommentsResponseDto })
  @ApiNotFoundResponse({ type: NotFoundError, description: 'CommentNotFound' })
  public async getCommentReplies(
    @Param() { id: commentId }: IdDto,
    @Query() query: LimitOffsetDto,
  ): Promise<GetCommentsResponseDto> {
    return this.commentService.getCommentReplies(commentId, query);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetCommentByIdDto })
  @ApiNotFoundResponse({ type: NotFoundError, description: 'CommentNotFound' })
  public async getCommentById(
    @Param() { id: commentId }: IdDto,
  ): Promise<GetCommentByIdDto> {
    return this.commentService.getCommentById(commentId);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: NotFoundError, description: 'CommentNotFound' })
  public async deleteComment(
    @Param() { id: commentId }: IdDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    return this.commentService.deleteComment(commentId, userId);
  }
}
