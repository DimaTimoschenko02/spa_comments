import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumnOptions,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreatePublicFileComment1697363508764
  implements MigrationInterface
{
  private readonly tableName = 'spa_comment_public_file';
  private readonly columns: TableColumnOptions[] = [
    {
      name: 'public_file_id',
      type: 'int8',
    },
    { name: 'comment_id', type: 'int8' },
  ];
  private readonly foreignKeys: TableForeignKeyOptions[] = [
    {
      name: 'public_file_comment_fk',
      columnNames: ['public_file_id'],
      referencedTableName: 'spa_public_file',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    },
    {
      name: 'comment_public_file_fk',
      columnNames: ['comment_id'],
      referencedTableName: 'spa_comment',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
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
