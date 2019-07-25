const request = require('supertest');
const server = require('../../api/server');
const db = require('../../data/dbConfig');

beforeEach(async () => {
  await db('users').truncate();
});

describe("Auth Register User", () => {
  test("[POST] /api/auth register user", () => {
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
        
        expect(registeredUser.username).toEqual('Isaac');
        expect(registeredUser.department).toEqual('Engineering');
        expect(res.body).toHaveProperty('token');
      });
  });
});