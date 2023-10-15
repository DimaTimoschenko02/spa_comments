import { DataSource, EntityRepository, Repository } from 'typeorm';
import { CommentFile } from '@src/comment/entities/comment-file.entity';

@EntityRepository()
export class CommentFileRepository extends Repository<CommentFile> {
  constructor(dataSource: DataSource) {
    super(CommentFile, dataSource.createEntityManager());
  }
}
