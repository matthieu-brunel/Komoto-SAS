# Komoto-SAS

Site web "Komoto SAS"
version française ci-après
Setup:
Install dependencies in the "back" folder using : npm install
Create a .env file at the root of "back" folder with the following (replace the XXX with your data):
REACT_APP_SERVER_ADDRESS=5000
REACT_APP_SERVER_ADDRESS_FULL=http://localhost:5000
JWT_SECRET=komoto
EMAIL_EXPEDITEUR=mail expéditeur
PASSWORD=mot de passe du mail expediteur
EMAIL_DESTINATAIRE= le mail du destinataire
DATABASE=komoto
USERDB=root
PASSWORDDB=
SALT=$2a$10$.xS1.szbGAYY7Yxa022Mu.
Install dependencies on the "front" folder using : npm install
Create a .env file at the root of "front" folder with the following (replace the XXX with your data):
      REACT_APP_SERVER_ADDRESS=5000
      REACT_APP_SERVER_ADDRESS_FULL=http://localhost:5000
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
Import "create_db.sql" and "insert_db.sql" from the back folder using : source + path to file
Run project:
Front , using : npm start
Back,using: nodemon server
Open project locally : http://localhost:XXXX ( replace XXXX with your data)

      
Version française:
Configuration avant la mise en route du site:
Installer les dépendances dans le répertoire "back" avec: npm install
Créer un fichier .env à la racine du répertoire "back" en y mettant les lignes ci-dessous (remplacer les XXXX par vos données)
    
REACT_APP_SERVER_ADDRESS_FULL=http://localhost:5000
JWT_SECRET=komoto
EMAIL_EXPEDITEUR=mail expéditeur
PASSWORD=mot de passe du mail expediteur
EMAIL_DESTINATAIRE= le mail du destinataire
DATABASE=komoto
USERDB=root
PASSWORDDB=
SALT=$2a$10$.xS1.szbGAYY7Yxa022Mu.
Installer les dépendances dans le répertoire "front" avec : npm install
Créer un fichier .env à la racine du répertoire "front" en y mettant la ligne ci-dessous ( remplacer les XXXX par vos données)
    REACT_APP_SERVER_ADDRESS=5000
      REACT_APP_SERVER_ADDRESS_FULL=http://localhost:5000
      SKIP_PREFLIGHT_CHECK=true
Configuration de l'accès et création de la base de données:
Configurer le fichiers config.js dans le répertoire "back"
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
Importer les fichiers "create_db.sql" et "insert_db.sql" pour la configuration de la base de données (dans répertoire "back") avec: source + "chemin du fichier"
Démarrer le serveur front: npm start
Démarrer le serveur back: nodemon server
Puis se rendre à l'adresse http://localhost:XXXX (remplacer les XXXX par vos données)
