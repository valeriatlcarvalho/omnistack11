const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG's Incidents", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to list Incidents to ONG", async () => {
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

    const ongId = responseOng.body.id;

    const incident1 = {
      title: "Caso 1",
      description: "Lorem ipsum dom amme tis.",
      value: 185
    };

    const incident2 = {
      title: "Caso 2",
      description: "Lorem ipsum dom amme tis.",
      value: 156
    };

    await request(app)
      .post("/incidents")
      .set("Authorization", ongId)
      .send(incident1);

    await request(app)
      .post("/incidents")
      .set("Authorization", ongId)
      .send(incident2);

    const response = await request(app)
      .get("/profile")
      .set("Authorization", ongId);

    expect(response.body.length).toEqual(2);
  });
});
