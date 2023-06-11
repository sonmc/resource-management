import mysql from 'mysql2';
import fs from 'fs';
import bcrypt from 'bcrypt';

const PASSWORD_DEFAULT = '123456';
const seedQuery = fs.readFileSync('src/database/seed.sql', {
    encoding: 'utf8',
});

const connection = mysql.createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'employee_db',
});

connection.connect();
const psw = PASSWORD_DEFAULT;
const hash = await bcrypt.hash(psw, 10);
connection.query(seedQuery, [hash], (err) => {
    if (err) {
        throw err;
    }
    connection.end();
});
