import { MigrationInterface, QueryRunner } from 'typeorm';

export class RmStatementIdOnStatementTag1726933992584
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('statement_tags', 'statement_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
