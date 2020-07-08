const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null,
  image_id: null
};

describe("test solution CRUD", () => {
  let server = null;
  let data = {};

  const solution = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    title_section: "test_title_section",
    language: "french",
    image_id: obj.image_id
  };

  const image = {
    name: "test_name_image",
    url: "test_url_image",
    alt: "test_alt_image",
    homepage_id: 1,
    section: "test_section_image"
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
        headers: { authorization: 'Bearer ' + token },
        body: image
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        obj.image_id = body.id;
        done();
      }
    );
  });


  it("post solution", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/solution",
        headers: { authorization: 'Bearer ' + token },
        body: solution
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        solution.id = body.id;
        expect(data.subtitle).toBe(solution.subtitle);
        expect(data.title).toBe(solution.title);
        expect(data.section).toBe(solution.section);
        expect(data.description).toBe(solution.description);
        expect(data.language).toBe(solution.language);
        expect(data.title_section).toBe(solution.title_section);
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
    solution.subtitle = "new put";
    solution.title = "new put";
    solution.section = "new put";
    solution.description = "new put";
    solution.language = "new put";
    solution.title_section = "new put";
    solution.image_id = obj.image_id;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/solution/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: [solution, image]
      },

      (error, response, body) => {
        //console.log("PUT", solution);
        const response_body = JSON.parse(response.request.body);
        expect(response_body[0].subtitle).toBe(solution.subtitle);
        expect(response_body[0].title).toBe(solution.title);
        expect(response_body[0].section).toBe(solution.section);
        expect(response_body[0].description).toBe(solution.description);
        expect(response_body[0].language).toBe(solution.language);
        expect(response_body[0].title_section).toBe(solution.title_section);
        expect(response_body[0].image_id).toBe(solution.image_id);
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
        headers: { authorization: 'Bearer ' + token },
        body:obj
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
