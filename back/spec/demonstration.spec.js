const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test demonstration CRUD", () => {
  let server = null;
  let data = {};

  const demonstration = {
    category: "test_category",
    type: "test_type",
    section: "test_section",
    description: "test_description",
    model_url: "test_model_url"
  };

  it("post demonstration", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/demonstration",
        headers: {},
        body: demonstration
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        demonstration.id = body.id;
        expect(data.category).toBe(demonstration.category);
        expect(data.type).toBe(demonstration.type);
        expect(data.section).toBe(demonstration.section);
        expect(data.description).toBe(demonstration.description);
        expect(data.model_url).toBe(demonstration.model_url);
        done();
      }
    );
  });

  it("get demonstration", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/demonstration"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update demonstration", done => {
    demonstration.category = "put_cat";
    demonstration.type = "put_ty";
    demonstration.section = "put_sec";
    demonstration.description = "put_des";
    demonstration.model_url = "put_mod";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/demonstration/" + obj.id,
        json: true,
        headers: {},
        body: demonstration
      },

      (error, response, body) => {
        console.log("PUT", body);
        expect(body.category).toBe(demonstration.category);
        expect(body.type).toBe(demonstration.type);
        expect(body.section).toBe(demonstration.section);
        expect(body.description).toBe(demonstration.description);
        expect(body.model_url).toBe(demonstration.model_url);
        done();
      }
    );
  });

  it("delete demonstration", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/demonstration/" + obj.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
