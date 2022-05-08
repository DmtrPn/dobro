import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRolesColumnToUser1652003674500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            ALTER TABLE users ADD COLUMN roles TEXT[] NOT NULL DEFAULT  '{}';
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`
            ALTER TABLE movie DROP COLUMN roles;
        `);
    }

}
