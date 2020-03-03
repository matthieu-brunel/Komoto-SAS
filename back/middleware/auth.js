
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtsecret = process.env.JWT_SECRET;

module.exports = function(req, res, next) {
  // on récupère l'en-tête Authorization qui contient le Bearer Token
  const header = req.headers['authorization'];

  // si l'en-tête est défini
  if (header !== undefined) {
    // on coupe notre token en 2 par rapport à l'espace vide
    // ( le token est toujours sous la forme Bearer daebz89d41ed4984d1ezd4)
    let tab = header.split(' ');
    let token = tab[1];

    // on enrichit notre objet req ( qui représente la requête du client )
    // en lui créant une propriété token dans laquelle on stocke le token
    // que nous a envoyé le client
    req.token = token;

    // on vérifie que le token envoyé par le client correspond
    // à un token précédemment renvoyé à une personne qui s'est authentifié
    // avec succès ( bah oui un token bidon ça ne sert à rien ! )
    jwt.verify(token, jwtsecret, (err, authenticationData) => {
      //  si le token envoyé ne correspond à un aucun token
      // attribué à un l'un des utilisateurs connectés alors il y a une erreur
      if (err) {
        // on renvoie le status 401, qui signifie que l'utilisateur n'est pas autorisé
        // à consulter cette ressource, et on ajoute le motif de l'erreur
        res.status(401).send('Unauthorized: ' + err.toString());
      } else {
        // sinon le token correspond bien à un utilisateur connecté
        // dont les données sont contenues dans authenticationData.
        // afin de pouvoir exploiter ces données dans la méthode d'API
        // on enrichit une nouvelle fois l'objet req.
        req.authenticationData = authenticationData;
        // et on passe à la méthode de middleware suivante
        next();
      }
    });
  } else {
    // renvoie un status 401 Unauthorized
    res.status(401).send('Unauthorized');
  }
};