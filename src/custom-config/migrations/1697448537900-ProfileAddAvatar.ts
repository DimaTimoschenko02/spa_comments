import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class ProfileAddAvatar1697448537900 implements MigrationInterface {
  private readonly tableName = 'spa_profile';
  private readonly column = new TableColumn({
    name: 'avatar_id',
    type: 'int8',
    isNullable: true,
  });
  private readonly foreignKey = new TableForeignKey({
    name: 'spa_profile_spa_public_file_fk',
    columnNames: ['avatar_id'],
    referencedTableName: 'spa_public_file',
    referencedColumnNames: ['id'],
    onDelete: 'SET NULL',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(this.tableName, this.column);
    await queryRunner.createForeignKey(this.tableName, this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.column);
    await queryRunner.dropForeignKey(this.tableName, this.foreignKey);
  }
}
