import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1686659373806 implements MigrationInterface {
    name = 'migration1686659373806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\` DROP FOREIGN KEY \`FK_67f8a1e3be2ea0f17564b871dfb\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\` DROP FOREIGN KEY \`FK_8cce8a13d529875e48b259a7f08\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\`
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
            CREATE INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\` (\`user_id\`)
        `);
        await queryRunner.query(`
            CREATE INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\` (\`role_id\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\`
            ADD CONSTRAINT \`FK_8cce8a13d529875e48b259a7f08\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles_perms\`
            ADD CONSTRAINT \`FK_67f8a1e3be2ea0f17564b871dfb\` FOREIGN KEY (\`perm_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users_roles\`
            ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
