import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateComment1697112175092 implements MigrationInterface {
  private readonly tableName = 'spa_comment';
  private readonly columns: TableColumnOptions[] = [
    { name: 'id', type: 'int8', isPrimary: true, isGenerated: true },
    { name: 'text', type: 'text' },
    { name: 'user_id', type: 'int8' },
    { name: 'home_page', type: 'varchar', length: '256', isNullable: true },
    { name: 'is_main', type: 'boolean', default: true },
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
      name: 'spa_comment_spa_user_fk',
      columnNames: ['user_id'],
      referencedTableName: 'spa_user',
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
