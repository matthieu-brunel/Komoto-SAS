/* const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null,
  image_id:0
};

describe("test reference CRUD", () => {
  let server = null;
  let data = {};
  

  const reference = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    title_section: "test_title_section",
    image_id: obj.image_id,
    language_id: 1
  };

  const image = {
    name: "test_name_image",
    url: "test_url_image",
    alt: "test_alt_image",
    homepage_id:1,
    section : "test_section_image"
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
        obj.image_id = body.id;
        done();
      }
    );
  });

  it("post reference", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference",
        headers: {
          authorization: 'Bearer ' + token
        },
        body: reference
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        obj.id = body.id;
        data = body;
        reference.id = body.id;
        expect(data.subtitle).toBe(reference.subtitle);
        expect(data.title).toBe(reference.title);
        expect(data.section).toBe(reference.section);
        expect(data.description).toBe(reference.description);
        expect(data.image_id).toBe(reference.image_id);
        expect(data.title_section).toBe(reference.title_section);
        expect(data.language_id).toBeGreaterThan(0);
        done();
      }
    );
  });

  it("get reference", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update reference", done => {
    reference.subtitle = "new put";
    reference.title = "new put";
    reference.section = "new put";
    reference.description = "new put";
    reference.image_id = obj.image_id;
    reference.title_section = "new put";
    reference.language_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: [reference, image]
      },

      (error, response, body) => {
        const response_body = JSON.parse(response.request.body);
        expect(response_body[0].subtitle).toBe(reference.subtitle);
        expect(response_body[0].title).toBe(reference.title);
        expect(response_body[0].section).toBe(reference.section);
        expect(response_body[0].description).toBe(reference.description);
        expect(response_body[0].image_id).toBeTruthy
        expect(response_body[0].title_section).toBe(reference.title_section);
        expect(response_body[0].language_id).toBeGreaterThan(0);
        done();
      }
    );
  });

  it("delete reference", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
          headers: {authorization: 'Bearer ' + token},
          body: obj
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
});
 */