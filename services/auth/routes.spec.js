const request = require("supertest");
const server = require("../../api/server");
const db = require("../../data/dbConfig");
const Controller = require("./controllers");

beforeEach(async () => {
  await db("users").truncate();
});

describe("Auth Register User", () => {
  test("[POST] /api/auth/register | Register user returns details of registered user", () => {
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

  test("[POST] /api/auth/register | Register user increments the database by 1 user", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Isaac",
        password: "12345",
        department: "Engineering"
      })
      .expect(201)
      .then(async () => {
        let users = await Controller.getUsers();
        expect(users).toHaveLength(1);
      });
  });
});

describe("Auth Register User", () => {
  test("[DELETE] /api/auth/:id | Users db returns 0 after delete user", () => {
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

  test("[DELETE] /api/auth/:id | Delete user returns details of deleted user", () => {
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

        return request(server)
          .delete(`/api/auth/${registeredUser.id}`)
          .expect(200)
          .then(res => {
            const { username, department } = res.body;
            expect(username).toEqual("Isaac");
            expect(department).toEqual("Engineering");
          });
      });
  });
});
