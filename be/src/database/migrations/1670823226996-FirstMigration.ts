import {MigrationInterface, QueryRunner} from "typeorm";

export class FirstMigration1670823226996 implements MigrationInterface {
    name = 'FirstMigration1670823226996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`workloads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`startDate\` datetime NOT NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`note\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`gender\` tinyint NOT NULL, \`avatar\` varchar(255) NULL, \`dob\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_1e3d0240b49c40521aaeb95329\` (\`phoneNumber\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_projects_projects\` (\`usersId\` int NOT NULL, \`projectsId\` int NOT NULL, INDEX \`IDX_1adafab12f396fa125182f0756\` (\`usersId\`), INDEX \`IDX_a0922cc630203931d8048fce1d\` (\`projectsId\`), PRIMARY KEY (\`usersId\`, \`projectsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_permissions_permissions\` (\`rolesId\` int NOT NULL, \`permissionsId\` int NOT NULL, INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` (\`rolesId\`), INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` (\`permissionsId\`), PRIMARY KEY (\`rolesId\`, \`permissionsId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`workloads\` ADD CONSTRAINT \`FK_c2a5143516772a26df1cb778883\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects_projects\` ADD CONSTRAINT \`FK_1adafab12f396fa125182f07564\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_projects_projects\` ADD CONSTRAINT \`FK_a0922cc630203931d8048fce1da\` FOREIGN KEY (\`projectsId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_dc2b9d46195bb3ed28abbf7c9e3\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` ADD CONSTRAINT \`FK_fd4d5d4c7f7ff16c57549b72c6f\` FOREIGN KEY (\`permissionsId\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_fd4d5d4c7f7ff16c57549b72c6f\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions_permissions\` DROP FOREIGN KEY \`FK_dc2b9d46195bb3ed28abbf7c9e3\``);
        await queryRunner.query(`ALTER TABLE \`users_projects_projects\` DROP FOREIGN KEY \`FK_a0922cc630203931d8048fce1da\``);
        await queryRunner.query(`ALTER TABLE \`users_projects_projects\` DROP FOREIGN KEY \`FK_1adafab12f396fa125182f07564\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`workloads\` DROP FOREIGN KEY \`FK_c2a5143516772a26df1cb778883\``);
        await queryRunner.query(`DROP INDEX \`IDX_fd4d5d4c7f7ff16c57549b72c6\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_dc2b9d46195bb3ed28abbf7c9e\` ON \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_permissions_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_a0922cc630203931d8048fce1d\` ON \`users_projects_projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_1adafab12f396fa125182f0756\` ON \`users_projects_projects\``);
        await queryRunner.query(`DROP TABLE \`users_projects_projects\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1e3d0240b49c40521aaeb95329\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP TABLE \`workloads\``);
    }

}
