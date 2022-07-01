import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1655910447617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_token',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',                    
                    },
                    {
                        name: 'refresh_token',
                        type: 'varchar',
                    },
                    {
                        name: 'expires_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    }],
                    foreignKeys: [{
                        name: 'FKUsersToken',
                        columnNames: ['user_id'],
                        referencedColumnNames: ['id'],
                        referencedTableName: 'users',
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_token');
    }

}
