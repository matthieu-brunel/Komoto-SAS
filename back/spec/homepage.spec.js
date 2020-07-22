const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test homepage CRUD", () => {
  let server = null;
  let data = {};

  const homepage = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    language: 1,
    image_id: 1
  };

  const image = {
    name: "test_name",
    url: "test_url",
    alt: "test_alt",
    homepage_id: 1,
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
        token = response.body.token;
        done();
      }
    );
  });


  it("post homepage", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/homepage",
        headers: { authorization: 'Bearer ' + token },
        body: homepage
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        homepage.id = body.id;
        expect(data.subtitle).toBe(homepage.subtitle);
        expect(data.title).toBe(homepage.title);
        expect(data.section).toBe(homepage.section);
        expect(data.description).toBe(homepage.description);
        expect(data.language).toBe(homepage.language);
        expect(data.image_id).toBeTruthy();
        done();
      }
    );
  });

  it("get homepage", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/homepage/all"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update homepage", done => {
    homepage.subtitle = "subtitle";
    homepage.title = "new title";
    homepage.section = "new section";
    homepage.description = "new description";
    homepage.language = 3;
    homepage.image_id = 3;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/homepage/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + token },
        body: [homepage, image]
      },

      (error, response, body) => {
      
        expect(body[0].subtitle).toBe(homepage.subtitle);
        expect(body[0].title).toBe(homepage.title);
        expect(body[0].section).toBe(homepage.section);
        expect(body[0].description).toBe(homepage.description);
        expect(body[0].language).toBe(homepage.language);
        expect(body[0].image_id).toBeTruthy();
        done();
      }
    );
  });

  it("delete homepage", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/homepage/" + obj.id,
        headers: { authorization: 'Bearer ' + token }
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
