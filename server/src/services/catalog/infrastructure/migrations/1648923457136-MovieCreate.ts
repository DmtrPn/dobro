import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieCreate1648923457136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner) {
        await queryRunner.query(`
            CREATE TABLE movie (
                movie_id UUID PRIMARY KEY,
                link TEXT NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                author_id UUID,
                status TEXT NOT NULL,
                rating INT
            );
        `);
    }

    public async down(queryRunner: QueryRunner) {
        await queryRunner.query(`
            DROP TABLE movie;
        `);
    }

}
