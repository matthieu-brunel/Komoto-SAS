const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let server = null;
var obj = {
  id: null,
  token:null
};


describe("test navbar CRUD", () => {

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
          user: "admin",
          password: "admin"
        }
      },
      (error, response, body) => {
        obj.token = body.token;

      }
    );

    request.get(
      SERVER_ADDRESS_FULL + "/api/language",
      {
        json: true
      },
      (error, response, body) => {
        navbar.language_id = response.body[0].id;
        done();
      }
    );
  });



  it("post navbar", done => {
    request.post(
      {
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/navbar",
        headers: { authorization: 'Bearer ' + obj.token },
        body: navbar
      },
      (error, response, body) => {
        if (error) { console.log(error) }
        else {
          expect(response.statusCode).toBe(200);
          data = body;
          navbar.id = body.id;
          expect(data.description).toBe(navbar.description);
          expect(data.language_id).toBeTruthy();
          done();
        }
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
   
      request.put(
        {
          url: SERVER_ADDRESS_FULL + "/api/navbar/" + navbar.id,
          json: true,
          headers: { authorization: 'Bearer ' + obj.token },
          body: navbar
        },
  
        (error, response, body) => {
        
          expect(body.description).toBe(navbar.description);
          expect(data.language_id).toBeTruthy();
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
          headers: { authorization: 'Bearer ' + obj.token }
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
});
