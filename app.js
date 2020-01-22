const express = require('express');
const config = require('config');

const {Client} = require('pg');

const app = express();

const PORT = config.get('port') || 5000;

//--------------------------------

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'online-shop',
    password: '777777',
    port: 5432,
});

//-----------------------------------


async function start() {
    try {
        await client.connect();

        app.listen(PORT, ()=> console.log(`App started on ${PORT}...`));

        client.query('SELECT NOW()', (err, res) => {
            console.log(err, res);
            client.end()
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}

start();


