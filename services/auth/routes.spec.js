const request = require("supertest");
const server = require("../../api/server");
const db = require("../../data/dbConfig");
const Controller = require("./controllers");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Auth Register User", () => {
  test("[POST] /api/auth/register | register user", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Isaac",
        password: "12345",
        department: "Engineering"
      })
      .expect(201)
      .then(res => {
        const { registeredUser } = res.body;

        expect(registeredUser.username).toEqual("Isaac");
        expect(registeredUser.department).toEqual("Engineering");
        expect(res.body).toHaveProperty("token");
      });
  });
});

describe("Auth Register User", () => {
  test("[DELETE] /api/auth/:id | delete user", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Isaac",
        password: "12345",
        department: "Engineering"
      })
      .expect(201)
      .then(async res => {
        const { registeredUser } = res.body;
        let users = await Controller.getUsers();
        expect(users).toHaveLength(1);
        return request(server)
          .delete(`/api/auth/${registeredUser.id}`)
          .expect(200)
          .then(async () => {
            let users = await Controller.getUsers();
            expect(users).toHaveLength(0);
          });
      });
  });
});
