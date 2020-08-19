const request = require("request");
require("dotenv").config();


const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;


describe("test demonstration CRUD", () => {
  let server = null;
  let data = {};


  let obj = {
    id: null,
    image_id: null,
    language_id: null,
    token: null
  };


  const demonstration = {
    title: "test_title",
    subtitle: "test_subtitle",
    section: "test_section",
    description: "test_description",
    model_url: "test_model_url",
    model_alt: "test_model_alt",
    image_id: null,
    language_id: null
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
        if (error) {
          console.log(error)
        } else {
          obj.token = body.token;
        }
      }
    );

    request.get(
      SERVER_ADDRESS_FULL + "/api/language",
      {
        json: true
      },
      (error, response, body) => {
        demonstration.language_id = body[body.length - 1].id;
      }
    );

    request.get(
      {
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image",
        headers: { authorization: 'Bearer ' + obj.token }
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          demonstration.image_id = body[body.length - 1].id;
          done();
        }
      }
    );
  });

  let data_image = {};

  it("post demonstration", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/demonstration",
        headers: {
          authorization: 'Bearer ' + obj.token
        },
        body: demonstration
      },
      (error, response, body) => {

        expect(response.statusCode).toBe(200);
        obj.id = body.id;
        data = body;
        demonstration.id = body.id;
        expect(data.subtitle).toBe(demonstration.subtitle);
        expect(data.title).toBe(demonstration.title);
        expect(data.section).toBe(demonstration.section);
        expect(data.description).toBe(demonstration.description);
        expect(data.model_alt).toBe(demonstration.model_alt);
        expect(data.model_url).toBe(demonstration.model_url);
        expect(data.language_id).toBeTruthy();
        expect(data.image_id).toBeTruthy();
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
      demonstration.subtitle = "put_cat";
      demonstration.title = "put_ty";
      demonstration.section = "put_sec";
      demonstration.description = "put_des";
      demonstration.model_alt = "put_model_alt";
      demonstration.model_url = "put_mod";

      request.put(
        {
          url: SERVER_ADDRESS_FULL + "/api/demonstration/" + demonstration.id,
          json: true,
          headers: { authorization: 'Bearer ' + obj.token },
          body: demonstration
        },
  
        (error, response, body) => {
  
          expect(body.subtitle).toBe(demonstration.subtitle);
          expect(body.title).toBe(demonstration.title);
          expect(body.section).toBe(demonstration.section);
          expect(body.description).toBe(demonstration.description);
          expect(body.model_alt).toBe(demonstration.model_alt);
          expect(body.model_url).toBe(demonstration.model_url);
          expect(data.image_id).toBeTruthy();
          expect(data.language_id).toBeTruthy();
          done();
        }
      );
    });
   
    it("delete demonstration", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/demonstration/" + demonstration.id,
          headers: { authorization: 'Bearer ' + obj.token }
        },
        (error, response, body) => {
          expect(response.statusCode).toBe(200);
          done();
        }
      );
    });
});


