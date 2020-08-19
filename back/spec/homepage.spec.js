const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

describe("test homepage CRUD", () => {
  let server = null;
  let data = {};

  let obj = {
    id: null,
    token:null
  };


  const homepage = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    language_id: 1,
    image_id: 1
  };

  const image = {
    name: "test_name",
    url: "test_url",
    alt: "test_alt",
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
        obj.token = body.token;
      }
    );

    request.get(
      SERVER_ADDRESS_FULL + "/api/language",
      {
        json: true
      },
      (error, response, body) => {
        homepage.language_id = body[body.length - 1].id;
      }
    );

    request.get(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image"
      },
      (error, response, body) => {

        homepage.image_id = body[body.length - 1].id;
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
        headers: { authorization: 'Bearer ' + obj.token },
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
        expect(data.language_id).toBeTruthy();
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
    homepage.subtitle = "new subtitle";
    homepage.title = "new title";
    homepage.section = "new section";
    homepage.description = "new description";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/homepage/" + homepage.id,
        json: true,
        headers: { authorization: 'Bearer ' + obj.token },
        body: [homepage, image]
      },

      (error, response, body) => {
  
        let data = body;
        expect(response.statusCode).toBe(200);
        expect(data[0].subtitle).toBe(homepage.subtitle);
        expect(data[0].title).toBe(homepage.title);
        expect(data[0].section).toBe(homepage.section);
        expect(data[0].description).toBe(homepage.description);
        expect(data[0].language_id).toBeTruthy();
        expect(data[0].image_id).toBeTruthy();
        done();
      }
    );
  });

  it("delete homepage", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/homepage/" + homepage.id,
          headers: { authorization: 'Bearer ' + obj.token }
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
});
