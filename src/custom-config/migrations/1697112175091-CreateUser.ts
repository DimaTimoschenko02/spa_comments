import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateUser1697112175091 implements MigrationInterface {
  private tableName = 'spa_user';
  private columns: TableColumnOptions[] = [
    {
      name: 'id',
      type: 'int8',
      isPrimary: true,
      isGenerated: true,
    },
    {
      name: 'password',
      type: 'text',
    },
    {
      name: 'profile_id',
      type: 'int8',
      isUnique: true,
    },
    {
      name: 'email',
      type: 'varchar',
      length: '64',
      isUnique: true,
    },
    { name: 'refreshToken', type: 'text', isNullable: true },
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
  private readonly foreignKeys: Array<TableForeignKeyOptions> = [
    {
      name: 'spa_user_spa_profile_fk',
      columnNames: ['profile_id'],
      referencedTableName: 'spa_profile',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    },
  ];
  private readonly table = new Table({
    name: this.tableName,
    columns: this.columns,
    foreignKeys: this.foreignKeys,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
