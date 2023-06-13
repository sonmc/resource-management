import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1686669038803 implements MigrationInterface {
    name = 'migration1686669038803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`permissions\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`profile_types\` varchar(255) NOT NULL,
                \`title\` varchar(255) NOT NULL,
                \`module\` varchar(255) NOT NULL,
                \`action\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`profile_type\` int NOT NULL,
                \`description\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`vacations\` (
                \`id\` char(36) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`reason\` varchar(255) NOT NULL,
                \`status\` int NOT NULL,
                \`type\` int NOT NULL,
                \`start\` datetime NOT NULL,
                \`end\` datetime NOT NULL,
                \`userId\` char(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`news\` (
                \`id\` char(36) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`title\` varchar(255) NOT NULL,
                \`content\` varchar(255) NOT NULL,
                \`image\` varchar(255) NULL,
                \`userId\` char(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` char(36) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`username\` varchar(255) NOT NULL,
                \`full_name\` varchar(255) NULL,
                \`nick_name\` varchar(255) NULL,
                \`email\` varchar(255) NULL,
                \`phone_number\` varchar(255) NULL,
                \`password\` varchar(255) NOT NULL,
                \`status\` int NOT NULL,
                \`gender\` tinyint NOT NULL,
                \`avatar\` varchar(255) NULL,
                \`dob\` datetime NOT NULL,
                \`address\` varchar(255) NOT NULL,
                \`introduce\` varchar(255) NULL,
                \`last_login\` datetime NULL,
                \`hash_refresh_token\` varchar(255) NULL,
                \`onboarding\` datetime NOT NULL,
                \`status_level\` varchar(255) NOT NULL,
                \`chapterHead\` int NULL,
                UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`lunch_orders\` (
                \`id\` char(36) NOT NULL,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`lunch_calendars\` json NULL,
                \`userId\` char(36) NULL,
                UNIQUE INDEX \`REL_a50a4d795de73bc2f4a8392ced\` (\`userId\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`roles_pems\` (
                \`role_id\` int NOT NULL,
                \`perm_id\` int NOT NULL,
                PRIMARY KEY (\`role_id\`, \`perm_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users_roles\` (
                \`role_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                PRIMARY KEY (\`role_id\`, \`user_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`roles_perms\` (
                \`perm_id\` int NOT NULL,
                \`role_id\` int NOT NULL,
                INDEX \`IDX_67f8a1e3be2ea0f17564b871df\` (\`perm_id\`),
                INDEX \`IDX_8cce8a13d529875e48b259a7f0\` (\`role_id\`),
                PRIMARY KEY (\`perm_id\`, \`role_id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD PRIMARY KEY (\`role_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP COLUMN \`user_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD \`user_id\` char(36) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD PRIMARY KEY (\`role_id\`, \`user_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\` (\`role_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`vacations\`
            ADD CONSTRAINT \`FK_89640b2dfe9d14d229c6943626f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`news\`
            ADD CONSTRAINT \`FK_9198b86c4c22bf6852c43f3b44e\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`lunch_orders\`
            ADD CONSTRAINT \`FK_a50a4d795de73bc2f4a8392ced6\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\`
            ADD CONSTRAINT \`FK_67f8a1e3be2ea0f17564b871dfb\` FOREIGN KEY (\`perm_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\`
            ADD CONSTRAINT \`FK_8cce8a13d529875e48b259a7f08\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\` DROP FOREIGN KEY \`FK_8cce8a13d529875e48b259a7f08\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\` DROP FOREIGN KEY \`FK_67f8a1e3be2ea0f17564b871dfb\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`lunch_orders\` DROP FOREIGN KEY \`FK_a50a4d795de73bc2f4a8392ced6\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`news\` DROP FOREIGN KEY \`FK_9198b86c4c22bf6852c43f3b44e\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`vacations\` DROP FOREIGN KEY \`FK_89640b2dfe9d14d229c6943626f\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD PRIMARY KEY (\`role_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP COLUMN \`user_id\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD \`user_id\` int NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP PRIMARY KEY
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD PRIMARY KEY (\`role_id\`, \`user_id\`)
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8cce8a13d529875e48b259a7f0\` ON \`roles_perms\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_67f8a1e3be2ea0f17564b871df\` ON \`roles_perms\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles_perms\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users_roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles_pems\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_a50a4d795de73bc2f4a8392ced\` ON \`lunch_orders\`
        `);
        await queryRunner.query(`
            DROP TABLE \`lunch_orders\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`news\`
        `);
        await queryRunner.query(`
            DROP TABLE \`vacations\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permissions\`
        `);
    }

}
