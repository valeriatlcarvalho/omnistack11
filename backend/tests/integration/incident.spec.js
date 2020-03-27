const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Incident", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create an Incident", async () => {
    const responseOng = await request(app)
      .post("/ongs")
      .send({
        name: "test",
        email: "contato@test.com.br",
        whatsapp: "41900000000",
        city: "New City",
        uf: "US"
      });

    const response = await request(app)
      .post("/incidents")
      .set("Authorization", responseOng.body.id)
      .send({
        title: "Cachorro doente",
        description:
          "Cachorro doente encontrado, precisa de remédios e tratamento.",
        value: 200
      });

    expect(response.body).toHaveProperty("id");
    expect(response.status).toEqual(200);
  });
});
