import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1690914769594 implements MigrationInterface {
    name = 'FirstMigration1690914769594'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_153746ba7a70e6e06250ad7e146"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "onDeleteId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "contacts" RENAME COLUMN "userId" TO "onDeleteId"`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_153746ba7a70e6e06250ad7e146" FOREIGN KEY ("onDeleteId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
