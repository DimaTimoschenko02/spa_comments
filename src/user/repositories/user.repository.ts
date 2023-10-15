import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from '@src/user/entities/user.entity';

@EntityRepository()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}
