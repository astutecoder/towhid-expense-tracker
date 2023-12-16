
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: process.env.Db_Server,
    user: process.env.Db_Username,
    password: process.env.Db_Password,
    database: process.env.Database,
  });

module.exports = {
    connection
}