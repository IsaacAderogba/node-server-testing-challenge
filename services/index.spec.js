const request = require("supertest");
const server = require("../api/server");

describe("services index", () => {
  test("[GET] /api is up and running", () => {
    return request(server)
      .get("/api")
      .expect(200)
      .then(res => {
        expect(res.body).toEqual({message: "Api is up and running"});
      });
  });
});
