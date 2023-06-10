import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1686396818624 implements MigrationInterface {
    name = 'migration1686396818624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "label" character varying NOT NULL,
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "description" character varying,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "news" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "content" character varying NOT NULL,
                "title" character varying NOT NULL,
                "image" character varying,
                "userId" integer,
                CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "vacations" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reason" character varying NOT NULL,
                "status" integer NOT NULL,
                "type" integer NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "end" TIMESTAMP NOT NULL,
                "userId" integer,
                CONSTRAINT "PK_830973008a9b7e114e612442750" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "username" character varying NOT NULL,
                "full_name" character varying,
                "nick_name" character varying,
                "email" character varying,
                "phone_number" character varying,
                "password" character varying NOT NULL,
                "status" integer NOT NULL,
                "gender" boolean NOT NULL,
                "avatar" character varying,
                "dob" TIMESTAMP NOT NULL,
                "address" character varying NOT NULL,
                "introduce" character varying,
                "onboarding" TIMESTAMP NOT NULL,
                "status_level" character varying NOT NULL,
                "chapterHead" integer,
                "last_login" TIMESTAMP,
                "hash_refresh_token" character varying,
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username")
        `);
        await queryRunner.query(`
            CREATE TABLE "lunch_orders" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "lunch_calendars" json,
                "userId" integer,
                CONSTRAINT "REL_a50a4d795de73bc2f4a8392ced" UNIQUE ("userId"),
                CONSTRAINT "PK_f89a15f14556fc068a97d7e2a1e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "notifications" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying,
                "content" character varying,
                "created_by" integer NOT NULL,
                "to" integer NOT NULL,
                "type" integer NOT NULL,
                "vacation_id" integer,
                CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "roles_perms" (
                "role_id" integer NOT NULL,
                "perm_id" integer NOT NULL,
                CONSTRAINT "PK_97441bb429dffea41940d6094e0" PRIMARY KEY ("role_id", "perm_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_roles" (
                "role_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_67f8a1e3be2ea0f17564b871df" ON "roles_perms" ("perm_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8cce8a13d529875e48b259a7f0" ON "roles_perms" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "news"
            ADD CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "vacations"
            ADD CONSTRAINT "FK_89640b2dfe9d14d229c6943626f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "lunch_orders"
            ADD CONSTRAINT "FK_a50a4d795de73bc2f4a8392ced6" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "roles_perms"
            ADD CONSTRAINT "FK_67f8a1e3be2ea0f17564b871dfb" FOREIGN KEY ("perm_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "roles_perms"
            ADD CONSTRAINT "FK_8cce8a13d529875e48b259a7f08" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "roles_perms" DROP CONSTRAINT "FK_8cce8a13d529875e48b259a7f08"
        `);
        await queryRunner.query(`
            ALTER TABLE "roles_perms" DROP CONSTRAINT "FK_67f8a1e3be2ea0f17564b871dfb"
        `);
        await queryRunner.query(`
            ALTER TABLE "lunch_orders" DROP CONSTRAINT "FK_a50a4d795de73bc2f4a8392ced6"
        `);
        await queryRunner.query(`
            ALTER TABLE "vacations" DROP CONSTRAINT "FK_89640b2dfe9d14d229c6943626f"
        `);
        await queryRunner.query(`
            ALTER TABLE "news" DROP CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e4435209df12bc1f001e536017"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_8cce8a13d529875e48b259a7f0"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_67f8a1e3be2ea0f17564b871df"
        `);
        await queryRunner.query(`
            DROP TABLE "users_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "roles_perms"
        `);
        await queryRunner.query(`
            DROP TABLE "notifications"
        `);
        await queryRunner.query(`
            DROP TABLE "lunch_orders"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_78a916df40e02a9deb1c4b75ed"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "vacations"
        `);
        await queryRunner.query(`
            DROP TABLE "news"
        `);
        await queryRunner.query(`
            DROP TABLE "roles"
        `);
        await queryRunner.query(`
            DROP TABLE "permissions"
        `);
    }

}
