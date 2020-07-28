const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




let token;

describe("test formulaire CRUD", () => {
  let server = null;
  let data = {};

  const formulaire = {
    name: "test_name",
    language_id: null
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
      }
    );

    request.get(
      SERVER_ADDRESS_FULL + "/api/language",
      {
        json: true
      },
      (error, response, body) => {
        formulaire.language_id = response.body[0].id;
        done();
      }
    );
  });





  it("post formulaire", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/formulaire",
        headers: { authorization: 'Bearer ' + token },
        body: formulaire
      },
      (error, response, body) => {

        expect(response.statusCode).toBe(200);
        data = body;
        formulaire.id = body.id;
        expect(data.name).toBe(formulaire.name);
        expect(data.language_id).toBeTruthy(true);
        done();
      }
    );
  });

  it("get formulaire", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/formulaire?language_id=" + formulaire.language_id
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update formulaire", done => {
    formulaire.name = "name_update";
 
    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/formulaire/" + formulaire.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: formulaire
      },

      (error, response, body) => {
        expect(body.name).toBe(formulaire.name);
        expect(data.language_id).toBeTruthy(true);
        done();
      }
    );
  });

  it("delete formulaire", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/formulaire/" + formulaire.id,
        headers: { authorization: 'Bearer ' + token }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });


  /*   it("delete image", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/image/" + obj_image.id,
          headers: { authorization: 'Bearer ' + token }
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
  
    it("delete language_id", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/language/" + obj_language.id,
          headers: { authorization: 'Bearer ' + token }
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    }); */
});
