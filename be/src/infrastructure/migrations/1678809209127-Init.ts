import {MigrationInterface, QueryRunner} from "typeorm";

export class Init1678809209127 implements MigrationInterface {
    name = 'Init1678809209127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`label\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`workloads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`project_id\` int NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vacations\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`reason\` varchar(255) NOT NULL, \`start\` datetime NOT NULL, \`end\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tasks\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`estimated_start\` int NOT NULL, \`estimated_end\` int NOT NULL, \`index\` int NOT NULL, \`kanbanColumnId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL, \`gender\` tinyint NOT NULL, \`avatar\` varchar(255) NULL, \`dob\` datetime NOT NULL, \`last_login\` datetime NULL, \`hash_refresh_token\` varchar(255) NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`projects\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`note\` varchar(255) NOT NULL, \`start_date\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`kanbans\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`projectId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`kanban_columns\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`index\` int NOT NULL, \`kanbanId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_pems\` (\`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`role_id\` int NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`role_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_projects\` (\`project_id\` int NOT NULL, \`user_id\` int NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, PRIMARY KEY (\`project_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_tasks\` (\`task_id\` int NOT NULL, \`user_id\` int NOT NULL, \`start_date\` datetime NOT NULL, \`end_date\` datetime NOT NULL, PRIMARY KEY (\`task_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_kanbans\` (\`kanban_id\` int NOT NULL, \`user_id\` int NOT NULL, \`joined_date\` datetime NOT NULL, \`user_shared\` int NOT NULL, PRIMARY KEY (\`kanban_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_vacations\` (\`vacation_id\` varchar(36) NOT NULL, \`user_id\` varchar(36) NOT NULL, INDEX \`IDX_e3d41ac4def7bdaa9ef8d986d1\` (\`vacation_id\`), INDEX \`IDX_4b06962fad72e30249fa98f689\` (\`user_id\`), PRIMARY KEY (\`vacation_id\`, \`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`joined_date\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`user_shared\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`start_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`end_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`start_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`end_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`joined_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`user_shared\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP COLUMN \`permission_id\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD \`permission_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`role_id\`, \`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD \`role_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`permission_id\`, \`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD \`role_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`user_id\`, \`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD \`user_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`role_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`task_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`task_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`user_id\`, \`task_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`task_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`user_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`task_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`user_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`project_id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`project_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`, \`project_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`kanban_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`user_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`kanban_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`kanban_id\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`kanban_id\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`user_id\`, \`kanban_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_ca161395d6a7e2f10590d9eea4\` ON \`roles_pems\` (\`permission_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_4df75616161dd63fae14f4f71b\` ON \`roles_pems\` (\`role_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\` (\`role_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_afb3dd8247c27198df5b9a8123\` ON \`users_tasks\` (\`task_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_aff222521447e7e0e4c51ff100\` ON \`users_tasks\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` ON \`users_projects\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_741210c246defe00ed877a98f2\` ON \`users_projects\` (\`project_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_add019dc84b4fa2c84569964d9\` ON \`users_kanbans\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`IDX_c52087f52f5c4bf5401fa466ff\` ON \`users_kanbans\` (\`kanban_id\`)`);
        await queryRunner.query(`ALTER TABLE \`workloads\` ADD CONSTRAINT \`FK_c2a5143516772a26df1cb778883\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tasks\` ADD CONSTRAINT \`FK_1bc14b887771ee4d9545d6756c2\` FOREIGN KEY (\`kanbanColumnId\`) REFERENCES \`kanban_columns\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kanbans\` ADD CONSTRAINT \`FK_4836a9bad654ac9fffd7d692a8b\` FOREIGN KEY (\`projectId\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`kanban_columns\` ADD CONSTRAINT \`FK_8fa7b15221b84dc6445ec228f8f\` FOREIGN KEY (\`kanbanId\`) REFERENCES \`kanbans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD CONSTRAINT \`FK_ca161395d6a7e2f10590d9eea48\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD CONSTRAINT \`FK_4df75616161dd63fae14f4f71b9\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_vacations\` ADD CONSTRAINT \`FK_e3d41ac4def7bdaa9ef8d986d15\` FOREIGN KEY (\`vacation_id\`) REFERENCES \`vacations\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_vacations\` ADD CONSTRAINT \`FK_4b06962fad72e30249fa98f689b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD CONSTRAINT \`FK_afb3dd8247c27198df5b9a81235\` FOREIGN KEY (\`task_id\`) REFERENCES \`tasks\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD CONSTRAINT \`FK_aff222521447e7e0e4c51ff1007\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_0f280c70a3a6ab7f4cf3c658c4c\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD CONSTRAINT \`FK_741210c246defe00ed877a98f2a\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD CONSTRAINT \`FK_add019dc84b4fa2c84569964d96\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD CONSTRAINT \`FK_c52087f52f5c4bf5401fa466ffa\` FOREIGN KEY (\`kanban_id\`) REFERENCES \`kanbans\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP FOREIGN KEY \`FK_c52087f52f5c4bf5401fa466ffa\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP FOREIGN KEY \`FK_add019dc84b4fa2c84569964d96\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_741210c246defe00ed877a98f2a\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP FOREIGN KEY \`FK_0f280c70a3a6ab7f4cf3c658c4c\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP FOREIGN KEY \`FK_aff222521447e7e0e4c51ff1007\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP FOREIGN KEY \`FK_afb3dd8247c27198df5b9a81235\``);
        await queryRunner.query(`ALTER TABLE \`users_vacations\` DROP FOREIGN KEY \`FK_4b06962fad72e30249fa98f689b\``);
        await queryRunner.query(`ALTER TABLE \`users_vacations\` DROP FOREIGN KEY \`FK_e3d41ac4def7bdaa9ef8d986d15\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP FOREIGN KEY \`FK_4df75616161dd63fae14f4f71b9\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP FOREIGN KEY \`FK_ca161395d6a7e2f10590d9eea48\``);
        await queryRunner.query(`ALTER TABLE \`kanban_columns\` DROP FOREIGN KEY \`FK_8fa7b15221b84dc6445ec228f8f\``);
        await queryRunner.query(`ALTER TABLE \`kanbans\` DROP FOREIGN KEY \`FK_4836a9bad654ac9fffd7d692a8b\``);
        await queryRunner.query(`ALTER TABLE \`tasks\` DROP FOREIGN KEY \`FK_1bc14b887771ee4d9545d6756c2\``);
        await queryRunner.query(`ALTER TABLE \`workloads\` DROP FOREIGN KEY \`FK_c2a5143516772a26df1cb778883\``);
        await queryRunner.query(`DROP INDEX \`IDX_c52087f52f5c4bf5401fa466ff\` ON \`users_kanbans\``);
        await queryRunner.query(`DROP INDEX \`IDX_add019dc84b4fa2c84569964d9\` ON \`users_kanbans\``);
        await queryRunner.query(`DROP INDEX \`IDX_741210c246defe00ed877a98f2\` ON \`users_projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f280c70a3a6ab7f4cf3c658c4\` ON \`users_projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_aff222521447e7e0e4c51ff100\` ON \`users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_afb3dd8247c27198df5b9a8123\` ON \`users_tasks\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_4df75616161dd63fae14f4f71b\` ON \`roles_pems\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca161395d6a7e2f10590d9eea4\` ON \`roles_pems\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`kanban_id\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`kanban_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`kanban_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`kanban_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD PRIMARY KEY (\`kanban_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`project_id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`project_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD PRIMARY KEY (\`project_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`task_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`user_id\`, \`task_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`task_id\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`task_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD PRIMARY KEY (\`task_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`user_id\`, \`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD \`role_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD PRIMARY KEY (\`role_id\`, \`user_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP COLUMN \`role_id\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD \`role_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`role_id\`, \`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`role_id\`)`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP COLUMN \`permission_id\``);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD \`permission_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`roles_pems\` ADD PRIMARY KEY (\`role_id\`, \`permission_id\`)`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`user_shared\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` DROP COLUMN \`joined_date\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`users_projects\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`user_shared\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_kanbans\` ADD \`joined_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`end_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_projects\` ADD \`start_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`end_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users_tasks\` ADD \`start_date\` datetime NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_4b06962fad72e30249fa98f689\` ON \`users_vacations\``);
        await queryRunner.query(`DROP INDEX \`IDX_e3d41ac4def7bdaa9ef8d986d1\` ON \`users_vacations\``);
        await queryRunner.query(`DROP TABLE \`users_vacations\``);
        await queryRunner.query(`DROP TABLE \`users_kanbans\``);
        await queryRunner.query(`DROP TABLE \`users_tasks\``);
        await queryRunner.query(`DROP TABLE \`users_projects\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`roles_pems\``);
        await queryRunner.query(`DROP TABLE \`kanban_columns\``);
        await queryRunner.query(`DROP TABLE \`kanbans\``);
        await queryRunner.query(`DROP TABLE \`projects\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`tasks\``);
        await queryRunner.query(`DROP TABLE \`vacations\``);
        await queryRunner.query(`DROP TABLE \`workloads\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
