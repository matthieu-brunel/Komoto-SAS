const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test reference CRUD", () => {
  let server = null;
  let data = {};

  const test_reference = {
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
        body: test_reference
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        test_reference.id = body.id;
        expect(data.category).toBe(test_reference.category);
        expect(data.type).toBe(test_reference.type);
        expect(data.section).toBe(test_reference.section);
        expect(data.description).toBe(test_reference.description);
        expect(data.image_id).toBe(test_reference.image_id);
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
    test_reference.category = "new put";
    test_reference.type = "new put";
    test_reference.section = "new put";
    test_reference.description = "new put";
    test_reference.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
        json: true,
        headers: {},
        body: test_reference
      },

      (error, response, body) => {
        console.log("PUT", body);
        expect(body.category).toBe(test_reference.category);
        expect(body.type).toBe(test_reference.type);
        expect(body.section).toBe(test_reference.section);
        expect(body.description).toBe(test_reference.description);
        expect(body.image_id).toBe(test_reference.image_id);
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
