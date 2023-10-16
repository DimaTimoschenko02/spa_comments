import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';
import { User } from '@src/user/entities/user.entity';
import { PublicFile } from '@src/public-file/entities/public-file.entity';

@Entity('spa_profile')
export class Profile extends IdTimestampEntity {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToOne(() => PublicFile)
  @JoinColumn({ name: 'avatar_id', referencedColumnName: 'id' })
  avatar: PublicFile;
}
