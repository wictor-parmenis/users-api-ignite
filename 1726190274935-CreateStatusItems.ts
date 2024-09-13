import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusItems1726190274935 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO "status" ("description") VALUES ('active'), ('inactive')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "status" WHERE description = 'active' OR description = 'inactive'`
    );
  }
}
