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
    category: "test_category",
    type: "test_type",
    section: "test_section",
    description: "test_description",
    image_id: 1
  };

  it("post reference", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference",
        headers: {},
        body: reference
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        reference.id = body.id;
        expect(data.category).toBe(reference.category);
        expect(data.type).toBe(reference.type);
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
    reference.category = "new put";
    reference.type = "new put";
    reference.section = "new put";
    reference.description = "new put";
    reference.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
        json: true,
        headers: {},
        body: reference
      },

      (error, response, body) => {
        console.log("PUT", body);
        expect(body.category).toBe(reference.category);
        expect(body.type).toBe(reference.type);
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
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
