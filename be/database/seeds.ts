import { Connection } from 'typeorm';
import { User } from '../src/service/schemas/user.schema';

export async function seed(connection: Connection) {
    const user = new User();
    user.email = 'test@test.com';
    user.full_name = 'Jan';
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);

    console.log('Here you can setup and run express/koa/any other framework.');
}
