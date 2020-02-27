const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test solution CRUD", () => {
  let server = null;
  let data = {};

  const solution = {
    category: "test_category",
    type: "test_type",
    section: "test_section",
    description: "test_description",
    language: "french",
    image_id: 1
  };

  it("post solution", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/solution",
        headers: {},
        body: solution
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        solution.id = body.id;
        expect(data.category).toBe(solution.category);
        expect(data.type).toBe(solution.type);
        expect(data.section).toBe(solution.section);
        expect(data.description).toBe(solution.description);
        expect(data.language).toBe(solution.language);
        expect(data.image_id).toBe(solution.image_id);
        done();
      }
    );
  });

  it("get solution", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/solution"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update solution", done => {
    solution.category = "new put";
    solution.type = "new put";
    solution.section = "new put";
    solution.description = "new put";
    solution.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/solution/" + obj.id,
        json: true,
        headers: {},
        body: solution
      },

      (error, response, body) => {
        console.log("PUT", body);
        expect(body.category).toBe(solution.category);
        expect(body.type).toBe(solution.type);
        expect(body.section).toBe(solution.section);
        expect(body.description).toBe(solution.description);
        expect(body.language).toBe(solution.language);
        expect(body.image_id).toBe(solution.image_id);
        done();
      }
    );
  });

it("delete solution", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/solution/" + obj.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  }); 
});
