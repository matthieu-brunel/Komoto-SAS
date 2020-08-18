const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



describe("test image CRUD", () => {
  let server = null;
  let data = {};


  let obj = {
    id: null,
    token:null
  };
  
  const image = {
    name: "test_name",
    url: "test_url",
    alt: "test_alt",
    section: "test_section"
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
        obj.token = body.token;
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
        headers: { authorization: 'Bearer ' + obj.token },
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
    image.section = "new put";


    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/image/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + obj.token },
        body: image
      },

      (error, response, body) => {
        expect(body.name).toBe(image.name);
        expect(body.url).toBe(image.url);
        expect(body.alt).toBe(image.alt);
        expect(body.section).toBe(image.section);
        done();
      }
    );
  });

});








