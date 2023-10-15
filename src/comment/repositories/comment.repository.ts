import { DataSource, EntityRepository, Repository } from 'typeorm';
import { Comment } from '@src/comment/entities/comment.entity';

@EntityRepository()
export class CommentRepository extends Repository<Comment> {
  constructor(dataSource: DataSource) {
    super(Comment, dataSource.createEntityManager());
  }
}
