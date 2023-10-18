import {
  DataSource,
  EntityRepository,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Comment } from '@src/comment/entities/comment.entity';
import { GetCommentsQueryDto } from '@src/comment/dtos/get-comments-query.dto';
import { LimitOffsetDto } from '@src/common/dtos/limit-offset.dto';

@EntityRepository()
export class CommentRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  public async getCommentReplies(
    commentId: number,
    { limit, offset }: LimitOffsetDto,
  ): Promise<[Comment[], number]> {
    const query = this.getCommentsQuery();

    return query
      .where('comment.parentComment.id = :id', { id: commentId })
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  }

  public async getCommentById(commentId: number): Promise<Comment> {
    const query = this.getCommentsQuery();

    return query.where('comment.id = :commentId', { commentId }).getOne();
  }

  public async getComments({
    limit,
    orderBy,
    sortBy,
    offset,
  }: GetCommentsQueryDto): Promise<[Comment[], number]> {
    const query = this.getCommentsQuery();

    return query
      .where('comment.isMain = true')
      .orderBy(sortBy, orderBy)
      .limit(limit)
      .offset(offset)
      .getManyAndCount();
  }

  private getCommentsQuery(): SelectQueryBuilder<Comment> {
    return this.createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.text',
        'comment.homePage',
        'comment.createdAt',
        'user.id',
        'user.email',
        'profile.name',
        'file.key',
        'file.type',
        'avatar.key',
        'avatar.type',
      ])
      .leftJoin('comment.files', 'file')
      .leftJoin('comment.user', 'user')
      .leftJoin('user.profile', 'profile')
      .leftJoin('profile.avatar', 'avatar')
      .leftJoin('comment.childComments', 'childComments')
      .loadRelationCountAndMap(
        'comment.childCommentsCount',
        'comment.childComments',
      );
  }
}
