const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test image CRUD", () => {
  let server = null;
  let data = {};

  const image = {
    name: "test_name",
    url: "test_url",
    alt: "test_alt"
  };

  it("post image", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image",
        headers: {},
        body: image
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        obj.id = body.id;
        data = body;
        image.id = body.id;
        expect(data.name).toBe(image.name);
        expect(data.url).toBe(image.url);
        expect(data.alt).toBe(image.alt);
        done();
      }
    );
  });

  it("get image", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update image", done => {
    image.name = "new put";
    image.url = "new put";
    image.alt = "new put";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/image/" + obj.id,
        json: true,
        headers: {},
        body: image
      },

      (error, response, body) => {
        expect(body.name).toBe(image.name);
        expect(body.url).toBe(image.url);
        expect(body.alt).toBe(image.alt);
        done();
      }
    );
  });

  it("delete image", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/image/" + obj.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
