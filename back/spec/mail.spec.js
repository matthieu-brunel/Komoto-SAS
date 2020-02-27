const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test mail CRUD", () => {
  let server = null;
  let data = {};

  const mail = {
    category: "test_category",
    description: "test_description",
    mail_destinataire:'mail destinaire'
  };

  it("post mail", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/mail",
        headers: {},
        body: mail
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        obj.id = body.id;
        data = body;
        mail.id = body.id;
        expect(data.category).toBe(mail.category);
        expect(data.description).toBe(mail.description);
        expect(data.mail_destinataire).toBe(mail.mail_destinataire);
        done();
      }
    );
  });

  it("get mail", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/mail"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update mail", done => {
    mail.category = "new put";
    mail.description = "new put";
    mail.mail_destinataire = "new put";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/mail/" + obj.id,
        json: true,
        headers: {},
        body: mail
      },

      (error, response, body) => {
        expect(body.category).toBe(mail.category);
        expect(body.description).toBe(mail.description);
        expect(body.mail_destinataire).toBe(mail.mail_destinataire);
        done();
      }
    );
  });

  it("delete mail", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/mail/" + obj.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
