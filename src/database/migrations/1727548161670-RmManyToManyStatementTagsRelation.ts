import { MigrationInterface, QueryRunner } from 'typeorm';

export class RmManyToManyStatementTagsRelation1727548161670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('statement_tags_association');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "statement_tags_association" ("statement_id" uuid NOT NULL, "tag_id" uuid NOT NULL, CONSTRAINT "PK_8e4052378f9b3c8fa2b4b4e4c57" PRIMARY KEY ("statement_id", "tag_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7d7f07271f6d5a4f49f2f8a8a7" ON "statement_tags_association" ("statement_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6c9e3c5b7d8e4163a8f9f4e9d6" ON "statement_tags_association" ("tag_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "statement_tags_association" ADD CONSTRAINT "FK_7d7f07271f6d5a4f49f2f8a8a7f" FOREIGN KEY ("statement_id") REFERENCES "statements"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "statement_tags_association" ADD CONSTRAINT "FK_6c9e3c5b7d8e4163a8f9f4e9d6b" FOREIGN KEY ("tag_id") REFERENCES "statement_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
