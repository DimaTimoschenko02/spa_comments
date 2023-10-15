import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
} from 'typeorm';

export class CreateProfile1697112157883 implements MigrationInterface {
  private readonly tableName = 'spa_profile';
  private readonly columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int8',
      isGenerated: true,
      isPrimary: true,
    },
    {
      name: 'name',
      type: 'varchar',
      length: '64',
    },
    {
      name: 'created_at',
      type: 'timestamp',
      default: 'NOW()',
    },
    {
      name: 'updated_at',
      type: 'timestamp',
      default: 'NOW()',
    },
  ];
  private readonly table = new Table({
    name: this.tableName,
    columns: this.columns,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
