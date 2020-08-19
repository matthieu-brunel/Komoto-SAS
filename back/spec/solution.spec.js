const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;



describe("test solution CRUD", () => {
  let server = null;
  let data = {};

  let obj = {
    id: null,
    image_id: null,
    token: null
  };

  const solution = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    title_section: "test_title_section",
    image_id: null,
    language_id: null
  };

  const image = {
    name: "test_name_image",
    url: "test_url_image",
    alt: "test_alt_image",
    section: "test_section_image"
  };



  beforeAll(done => {
    server = require('../server');
    request.post(
      SERVER_ADDRESS_FULL + '/api/login',
      {
        json: true,
        body: {
          user: "admin",
          password: "admin"
        }
      },
      (error, response, body) => {

        obj.token = body.token;
      }
    );

    request.get(
      SERVER_ADDRESS_FULL + "/api/language",
      {
        json: true
      },
      (error, response, body) => {

        solution.language_id = body[body.length - 1].id;
      }
    );

    request.get(
      {
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image",
        headers: { authorization: 'Bearer ' + obj.token },
        body: image
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {

          obj.image_id = body[body.length - 1].id
          solution.image_id = body[body.length - 1].id;
          done();
        }
      }
    );
  });


  it("post solution", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/solution",
        headers: { authorization: 'Bearer ' + obj.token },
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
        expect(data.language_id).toBe(solution.language_id);
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
        url: SERVER_ADDRESS_FULL + "/api/solution/all"
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
    solution.title_section = "new put";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/solution/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + obj.token },
        body: [solution, image]
      },

      (error, response, body) => {
      
        expect(response.statusCode).toBe(200);
        expect(body[0].subtitle).toBe(solution.subtitle);
        expect(body[0].title).toBe(solution.title);
        expect(body[0].section).toBe(solution.section);
        expect(body[0].description).toBe(solution.description);
        expect(body[0].language_id).toBe(solution.language_id);
        expect(body[0].title_section).toBe(solution.title_section);
        expect(body[0].image_id).toBe(solution.image_id);
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
        headers: { authorization: 'Bearer ' + obj.token },
        body: [image, solution]
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          expect(response.statusCode).toBe(200);
          done();
        }
      }
    );
  });


});
