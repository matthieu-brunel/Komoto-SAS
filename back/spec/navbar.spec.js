/* const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test navbar CRUD", () => {
  let server = null;
  let data = {};

  const navbar = {
    description: "test_name",
    language_id: 1
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


  it("post navbar", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/navbar",
        headers: { authorization: 'Bearer ' + token },
        body: navbar
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        data = body;
        navbar.id = body.id;
        expect(data.description).toBe(navbar.description);
        expect(data.language_id).toBeTruthy(true);
        done();
      }
    );
  });

   it("get navbar", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/navbar"
      },
      (error, response, body) => {
    
          expect(body).toEqual([]);
          expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update navbar", done => {
    navbar.description = "name_update";
    navbar.language_id = 2;


    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/navbar/" + navbar.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: navbar
      },

      (error, response, body) => {
      
        expect(body.description).toBe(navbar.description);
        expect(data.language_id).toBeTruthy(true);
        done();
      }
    );
  });

  it("delete navbar", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/navbar/" + navbar.id,
        headers: { authorization: 'Bearer ' + token }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
 */