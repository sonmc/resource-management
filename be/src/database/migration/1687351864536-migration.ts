import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1687351864536 implements MigrationInterface {
    name = 'migration1687351864536'

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
            CREATE TABLE \`workspaces\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`is_super\` tinyint NOT NULL,
                \`description\` varchar(255) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`username\` varchar(255) NOT NULL,
                \`is_owner\` tinyint NOT NULL,
                \`group_ids\` varchar(255) NOT NULL,
                \`full_name\` varchar(255) NULL,
                \`password\` varchar(255) NOT NULL,
                \`last_login\` datetime NULL,
                \`hash_refresh_token\` varchar(255) NULL,
                \`workspaceId\` int NULL,
                UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`tasks\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`title\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`status\` int NOT NULL,
                \`index\` int NOT NULL,
                \`implement\` int NULL,
                \`creator_id\` int NULL,
                \`start_date\` datetime NOT NULL,
                \`end_date\` datetime NOT NULL,
                \`point\` int NOT NULL,
                \`departmentId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`departments\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                \`description\` varchar(255) NULL,
                \`admin_id\` int NOT NULL,
                \`start_date\` datetime NOT NULL,
                \`workspaceId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`departments_users\` (
                \`department_id\` int NOT NULL,
                \`user_id\` int NOT NULL,
                \`is_admin\` tinyint NOT NULL,
                PRIMARY KEY (\`department_id\`, \`user_id\`)
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
            ALTER TABLE \`departments_users\` DROP COLUMN \`is_admin\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments_users\`
            ADD \`is_admin\` tinyint NOT NULL
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\` (\`role_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_e77268cbb031688beddd37b912\` ON \`departments_users\` (\`user_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_d1fd883d210abff1109645268f\` ON \`departments_users\` (\`department_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_949fea12b7977a8b2f483bf802a\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD CONSTRAINT \`FK_16f7d1a4b2676ca48c6c1a7b0ef\` FOREIGN KEY (\`departmentId\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments\`
            ADD CONSTRAINT \`FK_574c2f2b7f88862f739e0cbd6c4\` FOREIGN KEY (\`workspaceId\`) REFERENCES \`workspaces\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
        await queryRunner.query(`
            ALTER TABLE \`departments_users\`
            ADD CONSTRAINT \`FK_e77268cbb031688beddd37b912d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments_users\`
            ADD CONSTRAINT \`FK_d1fd883d210abff1109645268f4\` FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`departments_users\` DROP FOREIGN KEY \`FK_d1fd883d210abff1109645268f4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments_users\` DROP FOREIGN KEY \`FK_e77268cbb031688beddd37b912d\`
        `);
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
            ALTER TABLE \`departments\` DROP FOREIGN KEY \`FK_574c2f2b7f88862f739e0cbd6c4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_16f7d1a4b2676ca48c6c1a7b0ef\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_949fea12b7977a8b2f483bf802a\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_d1fd883d210abff1109645268f\` ON \`departments_users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e77268cbb031688beddd37b912\` ON \`departments_users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments_users\` DROP COLUMN \`is_admin\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`departments_users\`
            ADD \`is_admin\` tinyint NOT NULL
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
            DROP TABLE \`departments_users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`departments\`
        `);
        await queryRunner.query(`
            DROP TABLE \`tasks\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`workspaces\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permissions\`
        `);
    }

}
