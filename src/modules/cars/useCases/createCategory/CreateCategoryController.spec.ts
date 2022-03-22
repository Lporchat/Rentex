import request from "supertest";

import { app } from "../../../../shared/infra/http/app";

describe("Create Category controller", () => {
  it("should be able to create a new category", async () => {
    const response = await request(app).get("/cars/available");

    console.log(response);

    console.log("leonardo");

    // console.log(response);
  });
});
