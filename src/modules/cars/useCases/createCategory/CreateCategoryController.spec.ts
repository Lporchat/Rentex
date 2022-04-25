import request from "supertest";
import { Connection } from "typeorm";
import createConnection from "../../../../shared/infra/typeorm";

import { app } from "../../../../shared/infra/http/app";
import { hash } from "bcrypt";
import { v4 } from "uuid";

let connection: Connection;

describe("Create Category controller", () => {
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

  it("should be able to create a new category", async () => {
    const Responsetoken = await request(app).post("/sessions").send({
      password: "ad10le06",
      email: "lporchat06@gmail.com",
    });

    const { refresh_token } = Responsetoken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "ad10le06dd66",
        description: "lporchat06@gmail.com",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(201);
    // console.log(response);
  });

  it("should not be able to create a new category with name exists", async () => {
    const Responsetoken = await request(app).post("/sessions").send({
      password: "ad10le06",
      email: "lporchat06@gmail.com",
    });

    const { refresh_token } = Responsetoken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "ad10le06dd66",
        description: "lporchat06@gmail.com",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.statusCode).toBe(400);
    // console.log(response);
  });
});
