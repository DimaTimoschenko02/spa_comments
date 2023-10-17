import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';
import { User } from '@src/user/entities/user.entity';
import { PublicFile } from '@src/public-file/entities/public-file.entity';

@Entity('spa_comment')
export class Comment extends IdTimestampEntity {
  @Column({ type: 'text' })
  text: string;

  @Column({ type: 'varchar', length: '256', nullable: true, name: 'home_page' })
  homePage: string;

  @Column({ type: 'boolean', name: 'is_main', default: true })
  isMain: boolean;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => Comment, (comment) => comment.childComments, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'comment_comment',
    joinColumn: { name: 'parent_comment_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'child_comment_id',
      referencedColumnName: 'id',
    },
  })
  childComments: Comment[];

  @ManyToMany(() => PublicFile)
  @JoinTable({
    name: 'spa_comment_public_file',
    joinColumn: { name: 'comment_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'public_file_id', referencedColumnName: 'id' },
  })
  files: PublicFile[];

  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parent_comment_id', referencedColumnName: 'id' })
  parentComment: Comment;

  childCommentsCount: number;
}
