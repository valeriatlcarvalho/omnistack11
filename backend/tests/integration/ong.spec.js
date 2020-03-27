const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

const ong = {
  name: "test",
  email: "contato@test.com.br",
  whatsapp: "41900000000",
  city: "New City",
  uf: "US"
};

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send(ong);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
    expect(response.status).toEqual(200);
  });

  it("should be able to list ONGs", async () => {
    await request(app)
      .post("/ongs")
      .send(ong);
    const response = await request(app).get("/ongs");

    expect(response.body.length).toEqual(1);
    expect(response.status).toEqual(200);
  });
});
