import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStatementTagsTable1726621983289
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'statement_tags_association',
        columns: [
          {
            name: 'statement_id',
            type: 'uuid',
          },
          {
            name: 'tag_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['statement_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'statements',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'statement_tags',
            onDelete: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statement_tags_association');
  }
}
