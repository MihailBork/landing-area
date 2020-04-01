const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit : 10,
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: 'kotelnikovo'
});

module.exports = pool.promise();