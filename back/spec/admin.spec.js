const request = require("request");
require("dotenv").config();

const SERVER_ADDRESS_FULL = process.env.REACT_APP_SERVER_ADDRESS_FULL;

let obj = {
  id: null
};

describe("test admin CRUD", () => {
  let server = null;
  let data = {};

  const admin = {
    user: "test_user",
    password: "test_password"
  };

  it("post admin", done => {
    request(
      {
        method: "post",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/admin",
        headers: {},
        body: admin
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);

        obj.id = body.id;

        data = body;

        admin.id = body.id;
        expect(data.user).toBe(admin.user);
        expect(data.password).toBe(admin.password);
        done();
      }
    );
  });

  it("get admin", done => {
    request(
      {
        method: "get",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/admin"
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });

  it("should update admin", done => {
    admin.user = "put";
    admin.password = "put";

    request.put(
      {
        url: SERVER_ADDRESS_FULL + "/api/admin/" + obj.id,
        json: true,
        headers: {},
        body: admin
      },

      (error, response, body) => {
        console.log("PUT", body);
        expect(body.user).toBe(admin.user);
        expect(body.password).toBe(admin.password);
        done();
      }
    );
  });

  it("delete admin", done => {
    request(
      {
        method: "delete",
        json: true,
        url: SERVER_ADDRESS_FULL + "/api/admin/" + obj.id,
        headers: {}
      },
      (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      }
    );
  });
});
