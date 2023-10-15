import { DataSource, EntityRepository, Repository } from 'typeorm';

import { PublicFile } from '@src/public-file/entities/public-file.entity';
import { PublicFileTypeEnum } from '@src/public-file/enums/public-file-type.enum';

@EntityRepository()
export class PublicFileRepository extends Repository<PublicFile> {
  constructor(dataSource: DataSource) {
    super(PublicFile, dataSource.createEntityManager());
  }

  public async createPublicFile(
    key: string,
    type: PublicFileTypeEnum,
  ): Promise<PublicFile> {
    return await this.save({
      key,
      type,
    });
  }
}
