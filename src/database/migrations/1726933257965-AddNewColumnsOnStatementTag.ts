import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnsOnStatementTag1726933257965
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'statement_tags',
      new TableColumn({
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      })
    );

    await queryRunner.addColumn(
      'statement_tags',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('statement_tags', 'updated_at');
    await queryRunner.dropColumn('statement_tags', 'created_at');
  }
}
