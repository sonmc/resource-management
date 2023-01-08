import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1673157397258 implements MigrationInterface {
    name = 'FirstMigration1673157397258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workloads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`user_id\` int NOT NULL, \`project_id\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`note\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`gender\` tinyint NOT NULL, \`avatar\` varchar(255) NULL, \`dob\` datetime NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_permissions_permissions\` (\`rolesId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` (\`rolesId\`), INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` (\`permissionsId\`), PRIMARY KEY (\`rolesId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`id\` int NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`, \`project_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`id\`, \`project_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE INDEX \`IDX_741210c246defe00ed877a98f2\` ON \`users_projects\` (\`project_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` ON \`users_projects\` (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`workloads\` ADD CONSTRAINT \`FK_c2a5143516772a26df1cb778883\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_741210c246defe00ed877a98f2a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_0f280c70a3a6ab7f4cf3c658c4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_dc2b9d46195bb3ed28abbf7c9e3\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_fd4d5d4c7f7ff16c57549b72c6f\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_fd4d5d4c7f7ff16c57549b72c6f\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_dc2b9d46195bb3ed28abbf7c9e3\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_0f280c70a3a6ab7f4cf3c658c4c\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_741210c246defe00ed877a98f2a\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`workloads\` DROP FOREIGN KEY \`FK_c2a5143516772a26df1cb778883\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` ON \`users_projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_741210c246defe00ed877a98f2\` ON \`users_projects\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`, \`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`DROP INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`users_projects\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`workloads\``);
    }

}
