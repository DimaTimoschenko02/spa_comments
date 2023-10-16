import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Comment } from '@src/comment/entities/comment.entity';
import { GetCommentsQueryDto } from '@src/comment/dtos/get-comments-query.dto';

@EntityRepository()
export class CommentRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }

  public async getComments({
    limit,
    orderBy,
    sortBy,
    offset,
  }: GetCommentsQueryDto) {
    return this.createQueryBuilder('comment')
      .select([
        'comment.id',
        'comment.text',
        'comment.homePage',
        'comment.createdAt',
        'user.email',
        'profile.name',
        'file.key',
      ])
      .leftJoin('comment.files', 'file')
      .leftJoin('comment.user', 'user')
      .leftJoin('user.profile', 'profile')
      .leftJoin('comment.childComments', 'childComments')
      .loadRelationCountAndMap(
        'comment.childCommentsCount',
        'comment.childComments',
      )
      .where('comment.isMain = true')
      .orderBy(sortBy, orderBy)
      .limit(limit)
      .offset(offset)
      .getMany();
  }
}
