const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test image CRUD", () => {
  let server = null;
  let data = {};

  const image = {
    name: "test_name",
    url: "test_url",
    alt: "test_alt",
    homepage_id:1,
    section : "test_section"
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


  it("post image", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image",
        headers: {authorization: 'Bearer ' + token},
        body: image
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        obj.id = body.id;
        data = body;
        image.id = body.id;
        expect(data.name).toBe(image.name);
        expect(data.url).toBe(image.url);
        expect(data.alt).toBe(image.alt);
        expect(data.homepage_id).toBe(image.homepage_id);
        expect(data.section).toBe(image.section);
        done();
      }
    );
  });

  it("get image", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });





  it("should update image", done => {
    image.name = "new put";
    image.url = "new put";
    image.alt = "new put";
    image.homepage_id= 2;
    image.section = "new put";
    

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/image/" + obj.id,
        json: true,
        headers: {authorization: 'Bearer ' + token},
        body: image
      },

      (error, response, body) => {
        expect(body.name).toBe(image.name);
        expect(body.url).toBe(image.url);
        expect(body.alt).toBe(image.alt);
        expect(body.homepage_id).toBe(image.homepage_id);
        expect(body.section).toBe(image.section);
        done();
      }
    );
  });

  it("delete image", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image/" + obj.id,
        headers: {authorization: 'Bearer ' + token}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
