import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueTitleConstraint1726619960460
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'accounts',
      new TableUnique({
        columnNames: ['title'],
        name: 'unique_title',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('accounts', 'unique_title');
  }
}
