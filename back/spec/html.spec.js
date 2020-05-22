const request = require("request");
require("dotenv").config();


const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test html CRUD", () => {
  let server = null;
  let data = {};

  const html = {
    title: "test_title",
    text: "test_text",
    
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


  it("post html", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/html",
        headers: {
          authorization: 'Bearer ' + token
      },
        body: html
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        html.id = body.id;
        expect(data.title).toBe(html.title);
        expect(data.text).toBe(html.text);
        done();
      }
    );
  });

  it("get html", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/html"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update html", done => {
    html.title = "put_tit";
    html.text = "put_tex";
   

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/html/" + obj.id,
        json: true,
        headers: {authorization: 'Bearer ' + token},
        body: html
      },

      (error, response, body) => {
        //console.log("PUT", body);
        expect(body.title).toBe(html.title);
        expect(body.text).toBe(html.text);
        
        done();
      }
    );
  });

  it("delete html", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/html/" + obj.id,
        headers: {authorization: 'Bearer ' + token}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});