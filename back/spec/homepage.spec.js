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
    language: "french",
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


  it("post homepage", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/homepage",
        headers: {authorization: 'Bearer ' + token},
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
        expect(data.image_id).toBe(homepage.image_id);
        done();
      }
    );
  });

  it("get homepage", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/homepage"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update homepage", done => {
    homepage.subtitle = "new put";
    homepage.title = "new put";
    homepage.section = "new put";
    homepage.description = "new put";
    homepage.language = "new put";
    homepage.image_id = 2;

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/homepage/" + obj.id,
        json: true,
        headers: {authorization: 'Bearer ' + token},
        body: homepage
      },

      (error, response, body) => {
      
        expect(body.subtitle).toBe(homepage.subtitle);
        expect(body.title).toBe(homepage.title);
        expect(body.section).toBe(homepage.section);
        expect(body.description).toBe(homepage.description);
        expect(body.language).toBe(homepage.language);
        expect(body.image_id).toBe(homepage.image_id);
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
        headers: {authorization: 'Bearer ' + token}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  }); 
});
