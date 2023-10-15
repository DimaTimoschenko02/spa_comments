import { Column, Entity, OneToOne } from 'typeorm';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';
import { User } from '@src/user/entities/user.entity';

@Entity('spa_profile')
export class Profile extends IdTimestampEntity {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
