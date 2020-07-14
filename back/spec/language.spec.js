const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test language CRUD", () => {
  let server = null;
  let data = {};

  const language = {
    name: "test_name",
    locale: "test_locale"
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


  it("post language", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/language",
        headers: { authorization: 'Bearer ' + token },
        body: language
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        language.id = body.id;
        expect(data.name).toBe(language.name);
        expect(data.locale).toBe(language.locale);
        done();
      }
    );
  });

  it("get language", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/language"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update language", done => {
    language.name = "name_update";
    language.locale = "locale_update";


    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/language/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: language
      },

      (error, response, body) => {
      
        expect(body.name).toBe(language.name);
        expect(body.locale).toBe(language.locale);
        done();
      }
    );
  });

  it("delete language", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/language/" + obj.id,
        headers: { authorization: 'Bearer ' + token }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
