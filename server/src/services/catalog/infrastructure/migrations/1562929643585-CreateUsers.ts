import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1562929643585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            CREATE TABLE users (
                user_id VARCHAR(36) PRIMARY KEY,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                patronymic TEXT,
                email TEXT,
                is_deleted BOOL NOT NULL DEFAULT 'f'
            );
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`
            DROP TABLE users;
        `);
    }
}
