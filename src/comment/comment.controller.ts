import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentService } from '@src/comment/comment.service';
import { JwtAuthGuard } from '@src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '@src/common/utils/fileFilter';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileDto } from '@src/public-file/dtos/public-file.dto';
import { GetCurrentUserId } from '@src/common/decorators/get-current-user-id.decorator';
import { CreateCommentBodyDto } from '@src/comment/dtos/create-comment-body.dto';

@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('file')
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  public async createFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PublicFile> {
    return this.commentService.createFile(file);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  public async createComment(
    @Body() createCommentDto: CreateCommentBodyDto,
    @GetCurrentUserId() userId: number,
  ): Promise<void> {
    return this.commentService.createComment(userId, createCommentDto);
  }
}
