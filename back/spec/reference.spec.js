const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test reference CRUD", () => {
  let server = null;
  let data = {};

  const reference = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    image_id: 1
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

  it("post reference", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference",
        headers:  {
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
    reference.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token},
        body: reference
      },

      (error, response, body) => {
        expect(body.subtitle).toBe(reference.subtitle);
        expect(body.title).toBe(reference.title);
        expect(body.section).toBe(reference.section);
        expect(body.description).toBe(reference.description);
        expect(body.image_id).toBe(reference.image_id);
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
        headers: {authorization: 'Bearer ' + token}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
