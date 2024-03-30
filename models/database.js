const { Client } = require('pg')
require('dotenv').config();

const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.db_port,
    ssl: {
        rejectUnauthorized: false
    }
})
client.connect()
    .then(() => {
        console.log('Database connection successful!');
        
    })
    .catch((error) => {
        console.error('Database connection error:', error);
});



module.exports = client;