# Komoto-SAS

## Site web "KOMOTO SAS"

#### Setup: 

#### Install depencies in the "back" folder using: npm install

### Create a .env file at the root of "back" folder with the following (replace the XXX with your data):

REACT_APP_SERVER_ADDRESS=XXXX (chosen port number)

REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX (same as above)

JWT_SECRET=XXXX

EMAIL_EXPEDITEUR=mail expéditeur

PASSWORD=mot de passe du mail expediteur

EMAIL_DESTINATAIRE= le mail du destinataire

DATABASE=XXXX (database name)

USERDB=XXXX (database user)

PASSWORDDB=XXXX (database password)

SALT=XXXX (password encrypting "bcryp.js)

#### Install dependencies on the "front" folder using: npm install

### Create a .env file at the root of "front" folder with the following (replace the XXX with your data):


REACT_APP_SERVER_ADDRESS=XXXX (chosen port number)

REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX

SKIP_PREFLIGHT_CHECK=true

### Configure access and creation of the database:

#### Configure config.js file in the "back" folder

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

#### import "create_db.sql" from the back folder using: source + path to file

### Run project:

#### Front, using: npm start

#### Back, using: nodemon server

### Open project locally: http://localhost:XXXX (replace XXXX with your data)


##### Version française:

#### Configuration avant la mise en route du site:

#### Installer les dépendances dans le répertoire "back" avec: npm install

### Créer un fichier .env à la racine du répertoire "back" en y mettant les lignes ci-dessous (remplacer les XXXX par vos données)

REACT_APP_SERVER_ADDRESS=XXXX (chosen port number)

REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX (same as above)

JWT_SECRET=XXXX

EMAIL_EXPEDITEUR=mail expéditeur

PASSWORD=mot de passe du mail expediteur

EMAIL_DESTINATAIRE= le mail du destinataire

DATABASE=XXXX (database name)

USERDB=XXXX (database user)

PASSWORDDB=XXXX (database password)

SALT=XXXX (password encrypting "bcryp.js)

#### Installer les dépendances dans le repertoire "front" avec: npm install

### Créer un fichier .env à la racine du répertoire "front" en y mettant la ligne ci-dessous (remplacer les XXXX par vos données)

REACT_APP_SERVER_ADDRESS=XXXX (chosen port number)

REACT_APP_SERVER_ADDRESS_FULL=http://localhost:XXXX

SKIP_PREFLIGHT_CHECK=true

#### Configurer le fichier config.js dans le repertoire "back"


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

### Importer le fichier "create_db.sql" pour la configuration de la base de données (dans le repertoire "back") avec: source + "chemin du fichier"

### Démarrer le serveur front: npm start

### Démarrer le serveur back: nodemon server

### Puis se rendre à l'adresse http://locahost:XXXX (remplacer les XXXX par vos données)
