const mysql = require("mysql");

require("dotenv").config();
const USERDB = process.env.USERDB;
const PASSWORDDB = process.env.PASSWORDDB;
const DATABASE = process.env.DATABASE;

const connection = mysql.createConnection({
  host: "localhost",
  user: USERDB,
  password: PASSWORDDB,
  database: DATABASE
});

module.exports = connection;
