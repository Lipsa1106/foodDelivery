// tests/pricingController.test.js
const request = require("supertest");
const app = require("../index");

describe("POST /pricing", () => {
  it("should calculate total price correctly", async () => {
    const response = await request(app)
      .post("/pricing")
      .send({
        zone: "central",
        organization_id: "005",
        total_distance: 12,
        item_type: "perishable",
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("total_price");
  });

  it("should return 400 if pricing not found", async () => {
    const response = await request(app)
      .post("/pricing")
      .send({
        zone: "central",
        organization_id: "999",
        total_distance: 12,
        item_type: "perishable",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
