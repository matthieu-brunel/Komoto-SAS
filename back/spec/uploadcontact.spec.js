/* const request = require("request");
require("dotenv").config();
var fs = require('fs-js');

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


describe("test upload formulaire (POST)", () => {
  let server = null;
   beforeAll(done => {
    
    server = require("../server");
    done();

  });

  it("post contact", (done) => {
  
     request(
     {
        method:'post',
        url:SERVER_ADDRESS_FULL + '/api/uploadcontact',
     },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
     );
      
  });
}); */