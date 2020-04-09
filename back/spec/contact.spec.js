const request = require("request");
require("dotenv").config();
var fs = require("fs-js");

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

describe("test formulaire (POST)", () => {
  let server = null;
  let data = {};

  const formulaire = {
    societe: "test_societe",
    nom: "test_nom",
    prenom: "test_prenom",
    adresse: "test_adresse",
    telephone: "test_telephone",
    email: "test_email",
    message: "test_message",
    document: "test_image.jpg",
  };

  beforeAll((done) => {
    console.log("beforeAll");
    server = require("../server");

    fs.open("./public/documents/" + formulaire.document, "wx", (err, fd) => {
      if (err) {
        if (err.code === "EEXIST") {
          console.error("myfile already exists");
          return;
        }
        throw err;
      }
    });

    done();
  });

  it("post contact", (done) => {
    console.log("TRAITEMENT DU TEST CONTACT AVEC PIECE JOINTE");
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/contact",
        body: formulaire,
      },
      (error, response, body) => {
        if (error) {
          expect(response.statusCode).toBe(501);
        } else {
          let data = JSON.parse(response.request.body);
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toBe(
            "Votre demande de contact a bien été envoyée."
          );
          expect(data.societe).toBe(formulaire.societe);
          expect(data.nom).toBe(formulaire.nom);
          expect(data.prenom).toBe(formulaire.prenom);
          expect(data.adresse).toBe(formulaire.adresse);
          expect(data.telephone).toBe(formulaire.telephone);
          expect(data.email).toBe(formulaire.email);
          expect(data.message).toBe(formulaire.message);
          expect(data.document).toBe(formulaire.document);
        }
        done();
      }
    );
  });

  it("post contact", (done) => {
    console.log("TRAITEMENT DU TEST CONTACT SANS PIECE JOINTE");
    formulaire.document = "";
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/contact",
        body: formulaire,
      },
      (error, response, body) => {
        if (error) {
          expect(response.statusCode).toBe(501);
        } else {
          let data = JSON.parse(response.request.body);
          expect(response.statusCode).toBe(200);
          expect(response.body.message).toBe(
            "Votre demande de contact a bien été envoyée."
          );
          expect(data.societe).toBe(formulaire.societe);
          expect(data.nom).toBe(formulaire.nom);
          expect(data.prenom).toBe(formulaire.prenom);
          expect(data.adresse).toBe(formulaire.adresse);
          expect(data.telephone).toBe(formulaire.telephone);
          expect(data.email).toBe(formulaire.email);
          expect(data.message).toBe(formulaire.message);
          expect(data.document).toBe(formulaire.document);
        }
        done();
      }
    );
  });

  afterEach((done) => {
    if (formulaire.document !== "") {
      fs.unlink("./public/documents/" + formulaire.document, (err) => {
        if (err) throw err;
        console.log("successfully deleted");
      });
    }
    console.log("afterEach");
    done();
  });
});
