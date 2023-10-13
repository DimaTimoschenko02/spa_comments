import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKeyOptions,
} from 'typeorm';

export class CreateCommentCommentTable1697187296572
  implements MigrationInterface
{
  private readonly tableName = 'comment_comment';
  private readonly columns = [
    { name: 'parent_comment_id', type: 'int8', isPrimary: true },
    { name: 'child_comment_id', type: 'int8', isPrimary: true },
  ];

  private readonly foreignKeys: Array<TableForeignKeyOptions> = [
    {
      name: 'parent_comment_child_comment_fk',
      columnNames: ['parent_comment_id'],
      referencedTableName: 'spa_comment',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    },
    {
      name: 'child_comment_parent_comment_fk',
      columnNames: ['child_comment_id'],
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
