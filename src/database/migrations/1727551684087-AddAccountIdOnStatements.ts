import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddAccountIdOnStatements1727551684087
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'statements',
      new TableColumn({
        name: 'account_id',
        type: 'uuid',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'statements',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('statements');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('account_id') !== -1
    );
    await queryRunner.dropForeignKey('statements', foreignKey);
    await queryRunner.dropColumn('statements', 'account_id');
  }
}
