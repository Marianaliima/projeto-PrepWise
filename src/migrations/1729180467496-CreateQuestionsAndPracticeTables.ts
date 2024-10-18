import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuestionsAndPracticeTablests1729180467496
  implements MigrationInterface
{
  name = 'CreateQuestionsAndPracticeTables.ts1729180467496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "email" character varying NOT NULL,
        "name" character varying NOT NULL,
        "password" character varying NOT NULL,
        CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      )`,
    );

    await queryRunner.query(
      `CREATE TABLE "accounts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "createdAt" TIMESTAMP NOT NULL,
        "userId" uuid NOT NULL,
        CONSTRAINT "PK_accounts_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_accounts_userId" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )`,
    );

    // Remova ou ajuste a parte do DROP CONSTRAINT
    // await queryRunner.query(
    //   `ALTER TABLE "accounts" DROP CONSTRAINT "FK_2b995c673f59534efe164ced42d"`,
    // );

    await queryRunner.query(
      `CREATE TABLE "questions" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "description" character varying NOT NULL,
        "topic" character varying NOT NULL,
        CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id")
      )`
    );

    await queryRunner.query(
      `CREATE TABLE "practice" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "solution" text NOT NULL,
        "data" date NOT NULL,
        "feedback" text,
        "status" character varying(20) NOT NULL,
        "questionId" uuid,
        CONSTRAINT "PK_4d094a10eae690da34cc5b8ea32" PRIMARY KEY ("id")
      )`
    );
   
  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "practice" DROP CONSTRAINT "FK_e0d2b69a981dfd31eb0ca1bf082"`,
    ),
      await queryRunner.query(
        `ALTER TABLE "accounts" DROP CONSTRAINT "FK_3aa23c0a6d107393e8b40e3e2a6"`,
      ),
      await queryRunner.query(
        `ALTER TABLE "accounts" DROP CONSTRAINT "UQ_3aa23c0a6d107393e8b40e3e2a6"`,
      ),
      await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "userId"`),
      await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "createdAt"`),
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`),
      await queryRunner.query(`ALTER TABLE "accounts" ADD "login" uuid`),
      await queryRunner.query(
        `ALTER TABLE "accounts" ADD CONSTRAINT "REL_2b995c673f59534efe164ced42" UNIQUE ("login")`,
      ),
      await queryRunner.query(
        `ALTER TABLE "accounts" ADD "password" character varying NOT NULL`,
      ),
      await queryRunner.query(`DROP TABLE "practice"`),
      await queryRunner.query(`DROP TABLE "questions"`),
      await queryRunner.query(
        `ALTER TABLE "accounts" ADD CONSTRAINT "FK_2b995c673f59534efe164ced42d" FOREIGN KEY ("login") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
  }
}
