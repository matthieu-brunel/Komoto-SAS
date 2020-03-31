const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};




describe("test file CRUD", () => {
  let server = null;
  let data = {};

  const file = {
    name : "test_name",
    category: "test_category",
    mail_id: 1,

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


 it("post file", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/file",
        headers: {authorization: 'Bearer ' + token},
        body: file
      },
      (error, response, body) => {

        expect(response.statusCode).toBe(200);
        obj.id = body.id;
   
        data = body;

        file.id = body.id;
        expect(data.name).toBe(file.name);
        expect(data.category).toBe(file.category);
        expect(data.mail_id).toBe(file.mail_id);
        done();
      }
    );
  });

  it("get file", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/file",
        headers: {authorization: 'Bearer ' + token},
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update file", done => {
    file.category = "new put";
    file.type = "new put";
    file.section = "new put";
    file.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/file/" + obj.id,
        json: true,
        headers: {authorization: 'Bearer ' + token},
        body: file
      },

      (error, response, body) => {
        expect(body.name).toBe(file.name);
        expect(body.category).toBe(file.category);
        expect(body.mail_id).toBe(file.mail_id);
        done();
      }
    );
  });

  it("delete file", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/file/" + obj.id,
        headers: {authorization: 'Bearer ' + token}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});