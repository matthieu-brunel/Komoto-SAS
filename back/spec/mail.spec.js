const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null,
  array_id: []
};

describe("test mail CRUD", () => {
  let server = null;
  let data = {};

  const mail = {
    category: "test_category",
    description: "test_description",
    date: 'mail destinataire'
  };


  beforeAll(done => {
    server = require('../server');
    request.post(
      SERVER_ADDRESS_FULL + '/api/login',
      {
        json: true,
        body: {
          user: 'admin',
          password: 'admin'
        }
      },
      (error, response, body) => {
        token = response.body.token;

        done();
      }
    );
  });



  it("post mail", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/mail",
        body: mail
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
       
        obj.id = body.id;
        data = body;
        mail.id = body.id;
        expect(data.category).toBe(mail.category);
        expect(data.description).toBe(mail.description);
        expect(data.date).toBe(mail.date);
        done();
      }
    );
  });

  it("get mail", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/mail",
        headers: { authorization: 'Bearer ' + token }
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
    mail.date = "new put";
    mail.id = mail.id;
    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/mail/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: mail
      },

      (error, response, body) => {
        expect(body.category).toBe(mail.category);
        expect(body.description).toBe(mail.description);
        expect(body.date).toBe(mail.date);
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
        headers: { authorization: 'Bearer ' + token },
        body: mail
      },
      (error, response, body) => {
        expect(body).toBe("delete mail : success")
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});