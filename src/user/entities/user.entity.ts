import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';
import { Profile } from '@src/profile/entities/profile.entity';

@Entity('spa_user')
export class User extends IdTimestampEntity {
  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  refreshToken: string;

  @ManyToOne(() => Profile, (profile) => profile.user, { nullable: true })
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  profile: Profile;
}
