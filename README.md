# Komoto-SAS

Site web "KOMOTO SAS"
--
Install dependencies in the "back" folder using : npm install

Create a .env file at the root of "back" folder with the following (replace the XXX with your data):

REACT_APP_SERVER_ADDRESS=5000
REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX (replace XXXX with your data)
JWT_SECRET=komoto
EMAIL_EXPEDITEUR=mail expéditeur
PASSWORD=mot de passe du mail expediteur
EMAIL_DESTINATAIRE= le mail du destinataire
DATABASE=komoto
USERDB=root
PASSWORDDB=
SALT=$2a$10$.xS1.szbGAYY7Yxa022Mu.

Install dependencies on the "front" folder using: npm install

Create a .env file at the root of "front" with the following (replace the XXX with your data):

REACT_APP_SERVER_ADDRESS=5000
REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX (replace XXXX with your data)
SKIP_PREFLIGHT_CHECK=true

Configure access and creation of the database:

Configure config.js file in the "back" folder

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

Import "create_db.sql" from the back folser using: source + path to file

RUN PROJECT

Front, using: npm start
Back, using: nodemon server

OPEN PROJECT LOCALLY: http://localhost:XXXX (replace XXXX with your data)


