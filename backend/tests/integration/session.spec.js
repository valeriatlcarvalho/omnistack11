const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Sessions", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to open a session", async () => {
    const ong = {
      name: "test-profile",
      email: "contato@test-profile.com.br",
      whatsapp: "41900000000",
      city: "New City",
      uf: "US"
    };

    const responseOng = await request(app)
      .post("/ongs")
      .send(ong);

    const id = responseOng.body.id;

    const response = await request(app).post("/sessions").send({
      id
    });

    expect(response.body).toHaveProperty('name');
    expect(response.body.name).toEqual(ong.name);
  });
});
