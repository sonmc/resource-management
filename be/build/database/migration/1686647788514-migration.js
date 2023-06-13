"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migration1686647788514 = void 0;
class migration1686647788514 {
    constructor() {
        this.name = 'migration1686647788514';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            CREATE TABLE "permissions" (
                "id" SERIAL NOT NULL,
                "profile_types" character varying NOT NULL,
                "title" character varying NOT NULL,
                "module" character varying NOT NULL,
                "action" character varying NOT NULL,
                CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "roles" (
                "id" SERIAL NOT NULL,
                "title" character varying NOT NULL,
                "profile_type" integer NOT NULL,
                "description" character varying,
                CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "vacations" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "reason" character varying NOT NULL,
                "status" integer NOT NULL,
                "type" integer NOT NULL,
                "start" TIMESTAMP NOT NULL,
                "end" TIMESTAMP NOT NULL,
                "userId" uuid,
                CONSTRAINT "PK_830973008a9b7e114e612442750" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "news" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "title" character varying NOT NULL,
                "content" character varying NOT NULL,
                "image" character varying,
                "userId" uuid,
                CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
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
                "last_login" TIMESTAMP,
                "hash_refresh_token" character varying,
                "onboarding" TIMESTAMP NOT NULL,
                "status_level" character varying NOT NULL,
                "chapterHead" integer,
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username")
        `);
            yield queryRunner.query(`
            CREATE TABLE "lunch_orders" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "lunch_calendars" json,
                "userId" uuid,
                CONSTRAINT "REL_a50a4d795de73bc2f4a8392ced" UNIQUE ("userId"),
                CONSTRAINT "PK_f89a15f14556fc068a97d7e2a1e" PRIMARY KEY ("id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "roles_pems" (
                "role_id" integer NOT NULL,
                "perm_id" integer NOT NULL,
                CONSTRAINT "PK_56b17562407e43dc47fbd21217f" PRIMARY KEY ("role_id", "perm_id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "users_roles" (
                "role_id" integer NOT NULL,
                "user_id" integer NOT NULL,
                CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
            )
        `);
            yield queryRunner.query(`
            CREATE TABLE "roles_perms" (
                "perm_id" integer NOT NULL,
                "role_id" integer NOT NULL,
                CONSTRAINT "PK_97441bb429dffea41940d6094e0" PRIMARY KEY ("perm_id", "role_id")
            )
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_67f8a1e3be2ea0f17564b871df" ON "roles_perms" ("perm_id")
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_8cce8a13d529875e48b259a7f0" ON "roles_perms" ("role_id")
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" uuid NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id")
        `);
            yield queryRunner.query(`
            CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id")
        `);
            yield queryRunner.query(`
            ALTER TABLE "vacations"
            ADD CONSTRAINT "FK_89640b2dfe9d14d229c6943626f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "news"
            ADD CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "lunch_orders"
            ADD CONSTRAINT "FK_a50a4d795de73bc2f4a8392ced6" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "roles_perms"
            ADD CONSTRAINT "FK_67f8a1e3be2ea0f17564b871dfb" FOREIGN KEY ("perm_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "roles_perms"
            ADD CONSTRAINT "FK_8cce8a13d529875e48b259a7f08" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"
        `);
            yield queryRunner.query(`
            ALTER TABLE "roles_perms" DROP CONSTRAINT "FK_8cce8a13d529875e48b259a7f08"
        `);
            yield queryRunner.query(`
            ALTER TABLE "roles_perms" DROP CONSTRAINT "FK_67f8a1e3be2ea0f17564b871dfb"
        `);
            yield queryRunner.query(`
            ALTER TABLE "lunch_orders" DROP CONSTRAINT "FK_a50a4d795de73bc2f4a8392ced6"
        `);
            yield queryRunner.query(`
            ALTER TABLE "news" DROP CONSTRAINT "FK_9198b86c4c22bf6852c43f3b44e"
        `);
            yield queryRunner.query(`
            ALTER TABLE "vacations" DROP CONSTRAINT "FK_89640b2dfe9d14d229c6943626f"
        `);
            yield queryRunner.query(`
            DROP INDEX "IDX_e4435209df12bc1f001e536017"
        `);
            yield queryRunner.query(`
            DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" integer NOT NULL
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
            yield queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
            yield queryRunner.query(`
            DROP INDEX "IDX_8cce8a13d529875e48b259a7f0"
        `);
            yield queryRunner.query(`
            DROP INDEX "IDX_67f8a1e3be2ea0f17564b871df"
        `);
            yield queryRunner.query(`
            DROP TABLE "roles_perms"
        `);
            yield queryRunner.query(`
            DROP TABLE "users_roles"
        `);
            yield queryRunner.query(`
            DROP TABLE "roles_pems"
        `);
            yield queryRunner.query(`
            DROP TABLE "lunch_orders"
        `);
            yield queryRunner.query(`
            DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"
        `);
            yield queryRunner.query(`
            DROP TABLE "users"
        `);
            yield queryRunner.query(`
            DROP TABLE "news"
        `);
            yield queryRunner.query(`
            DROP TABLE "vacations"
        `);
            yield queryRunner.query(`
            DROP TABLE "roles"
        `);
            yield queryRunner.query(`
            DROP TABLE "permissions"
        `);
        });
    }
}
exports.migration1686647788514 = migration1686647788514;
