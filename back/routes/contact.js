require("dotenv").config();
const express = require("express");
const moment = require("moment");
const bodyParser = require("body-parser");
const router = express();
const nodemailer = require("nodemailer");
const email_emetteur = process.env.EMAIL_EXPEDITEUR;
const password_emetteur = process.env.PASSWORD;
const email_destinataire = process.env.EMAIL_DESTINATAIRE;
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS_FULL;
const fetch = require("node-fetch");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true
  })
);

let smtp = {
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: email_emetteur,
    pass: password_emetteur
  }
};

let transporter = nodemailer.createTransport(smtp);

function save_mail(content){
  let date = new Date();
  date = moment(date.getTime()).format('YYYY-MM-DD hh:mm:ss');

  const data = {
    category:'mail',
    description:JSON.stringify(content),
    date: date
  }

  fetch(SERVER_ADDRESS + '/api/mail',
  {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
    method:'POST',
    body:JSON.stringify(data)
  })
  .then(res => res.json())
} 


router.post("/", (req, res) => {
  const societe = req.body.societe;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const telephone = req.body.telephone;
  const adresse = req.body.adresse;
  const email = req.body.email;
  const message = req.body.message;
  const document = req.body.document;
  const body_mail = `
       <div>
        <h2><strong>Demande de contact </strong></h2>
        <h3>Societe: ${societe} </h3>
         <h3>Nom: ${nom} </h3>
         <h3>Prenom: ${prenom} </h3>
         <h3>Telephone: ${telephone} </h3>
         <h3>Adresse: ${adresse} </h3>
         <h3>Email: ${email}</h3>
         <h3>Message: ${message} </h3>
         <h4> <font color="red">Ceci est un message automatique, merci de ne pas repondre. </font></h4>
       </div>
        `;

  save_mail(req.body);

  
  if (document !== "") {
    // send mail with defined transport object
    var mailOptions = {
      from: email_emetteur, // adresse email expediteur
      to: email_destinataire, // adresse email receptionnaire
      subject: " contact " + req.body.nom, // Subject line
      html: body_mail,
      attachments: [
        {
          filename: document,
          path: "./public/documents/" + document
        }
      ]
    };
  } else {
    // send mail with defined transport object
    var mailOptions = {
      from: email_emetteur, // adresse email expediteur
      to: email_destinataire, // adresse email receptionnaire
      subject: " contact " + req.body.nom, // Subject line
      html: body_mail
    };
  }

  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) {
      res.status(501).send(error.message);
    } else {
      res.status(200).json({
        message: "Votre demande de contact a bien été envoyée."
      });
    }
  });
});

module.exports = router;
