import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'local') {
    dotenv.config({ path: './env/local.env' });
}

const config: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + './../../**/*.schema{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: ['database/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'database/migrations',
    },
};

console.log(config);

export default config;
