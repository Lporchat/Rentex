import request from "supertest";
import { Connection } from "typeorm";
import createConnection from "../../../../shared/infra/typeorm";

import { app } from "../../../../shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 } from "uuid";

let connection: Connection;

describe("List Category controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = v4();
    const password = await hash("ad10le06", 8);

    await connection.query(
      `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, drive_license)
       VALUES ('${id}', 'leonardo', 'lporchat06@gmail.com', '${password}', true, 'now()', 'xxxxxx')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list a category", async () => {
    const Responsetoken = await request(app).post("/sessions").send({
      password: "ad10le06",
      email: "lporchat06@gmail.com",
    });

    const { token } = Responsetoken.body;

    console.log(token);

    await request(app)
      .post("/categories")
      .send({
        name: "leonardo",
        description: "leonardo",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");
    // console.log(response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("leonardo");
  });
});
