const request = require("request");
require("dotenv").config();
var fs = require('fs-js');

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


describe("test upload formulaire (POST)", () => {
  let server = null;

  obj = {
    language_id: null,
    image_id: null,
    token: null
  }


  beforeAll(done => {

    server = require("../server");
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
        obj.language_id = body[body.length - 1].id;
      }
    );

    request.get(
      {
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image"
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {

          obj.image_id = body[body.length - 1].id
          done();
        }
      }
    );

  });

  it("post contact", (done) => {

    request(
      {
        method: 'post',
        url: SERVER_ADDRESS_FULL + '/api/uploadcontact',
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );

  });

  it(" delete language id row", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + '/api/language/' + obj.language_id,
        headers: { authorization: "Bearer " + obj.token },

      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });


  it(" delete image id row", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + '/api/image/' + obj.image_id,
        headers: { authorization: "Bearer " + obj.token },

      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});