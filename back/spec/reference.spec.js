const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;




describe("test reference CRUD", () => {
  let server = null;
  let data = {};

  let obj = {
    id: null,
    image_id: null,
    token: null
  };

  const reference = {
    subtitle: "test_subtitle",
    title: "test_title",
    section: "test_section",
    description: "test_description",
    title_section: "test_title_section",
    image_id: obj.image_id,
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
          user: 'admin',
          password: 'admin'
        }
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
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
        reference.language_id = response.body[0].id;
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
          reference.image_id = body[body.length - 1].id;
          done();
        }
      }
    );
  });

  it("post reference", done => {
    request.post(
      {
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference",
        headers: {
          authorization: 'Bearer ' + obj.token
        },
        body: reference
      },
      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {

          expect(response.statusCode).toBe(200);

          obj.id = body.id;
          data = body;
          reference.id = body.id;
          expect(data.subtitle).toBe(reference.subtitle);
          expect(data.title).toBe(reference.title);
          expect(data.section).toBe(reference.section);
          expect(data.description).toBe(reference.description);
          expect(data.image_id).toBe(reference.image_id);
          expect(data.title_section).toBe(reference.title_section);
          expect(data.language_id).toBeGreaterThan(0);
          done();
        }
      }
    );
  });

  it("get reference", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/reference/all"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update reference", done => {
    reference.subtitle = "new put";
    reference.title = "new put";
    reference.section = "new put";
    reference.description = "new put";
    reference.title_section = "new put";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
        json: true,
        headers: { authorization: 'Bearer ' + obj.token },
        body: [reference, image]
      },

      (error, response, body) => {
        if (error) {
          console.log(error);
        } else {
          expect(response.statusCode).toBe(200);
          expect(body.reference.subtitle).toBe(reference.subtitle);
          expect(body.reference.title).toBe(reference.title);
          expect(body.reference.section).toBe(reference.section);
          expect(body.reference.description).toBe(reference.description);
          expect(body.reference.image_id).toBeTruthy
          expect(body.reference.title_section).toBe(reference.title_section);
          expect(body.reference.language_id).toBeGreaterThan(0);
          done();
        }

      }
    );
  });

  it("delete reference", done => {
      request(
        {
          method: "delete",
          json: true,
          url: SERVER_ADDRESS_FULL + "/api/reference/" + obj.id,
          headers: { authorization: 'Bearer ' + obj.token },
          body: obj
        },
        (error, response, body) => {
          if(error){
            console.log(error);
          }else{
            console.log(body);
            expect(response.statusCode).toBe(200);
            done();
          }
        }
      );
    });


});
