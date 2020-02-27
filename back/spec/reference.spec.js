const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

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
        console.log("BODY", body);
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
  it("put reference", done => {
    (test_reference.category = "category_test"),
      (test_reference.type = "type_test");
    test_reference.section = "section_test";
    test_reference.description = "description_test";
    test_reference.image_id = "2";

    request(
      {
        method: "put",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference/" + test_reference.id,
        headers: {},
        body: test_reference
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        data = body;
        expect(data.category).toBe(test_reference.category);
        expect(data.type).toBe(test_reference.type);
        expect(data.section).toBe(test_reference.section);
        expect(data.description).toBe(test_reference.description);
        expect(data.image_id).toBe(test_reference.image_id);
        done();
      }
    );
  });
  it("delete reference", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference" + test_reference.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
