import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTagIdOnStatemetsTable1727033346659
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'statements',
      new TableColumn({
        name: 'tag_id',
        type: 'uuid',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('statements', 'tag_id');
  }
}
