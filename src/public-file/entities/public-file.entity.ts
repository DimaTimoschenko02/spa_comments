import { Column, Entity } from 'typeorm';

import { PublicFileTypeEnum } from '@src/public-file/enums/public-file-type.enum';
import { IdTimestampEntity } from '@src/common/entities/id-timestamp.entity';

@Entity('spa_public_file')
export class PublicFile extends IdTimestampEntity {
  @Column({
    name: 'key',
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  key: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: PublicFileTypeEnum,
    nullable: false,
  })
  type: PublicFileTypeEnum;
}
