import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';
import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { Comment } from '@src/comment/entities/comment.entity';

@Entity('spa_comment_public_file')
export class CommentFile extends IdTimestampEntity {
  @OneToOne(() => PublicFile)
  @JoinColumn({ name: 'public_file_id', referencedColumnName: 'id' })
  publicFile: PublicFile;

  @ManyToOne(() => Comment, (comment) => comment.files)
  @JoinColumn({ name: 'comment_id', referencedColumnName: 'id' })
  comment: Comment;
}
