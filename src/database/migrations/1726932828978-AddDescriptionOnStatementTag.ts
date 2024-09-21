import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDescriptionOnStatementTag1726932828978
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'statement_tags',
      new TableColumn({
        name: 'description',
        type: 'varchar',
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('statement_tags', 'description');
  }
}
