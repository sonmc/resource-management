import {MigrationInterface, QueryRunner} from "typeorm";

export class init1673428213746 implements MigrationInterface {
    name = 'init1673428213746'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NULL, \`is_done\` tinyint NOT NULL DEFAULT 0, \`createdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateddate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` text NOT NULL, \`createdate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updateddate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`last_login\` datetime NULL, \`hach_refresh_token\` varchar(255) NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`todo\``);
    }

}
