import { v4 } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
  //bug do docker com typeorm que é de vez em quando precisa trocar para host para "localhost" em vez de "database" como a imagem do docker
  const connection = await createConnection("localhost");

  const id = v4();
  const password = await hash("ad10le06", 8);

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, drive_license)
     VALUES ('${id}', 'leonardo', 'lporchat06@gmail.com', '${password}', true, 'now()', 'xxxxxx')`
  );

  await connection.close;
  
}

create().then(() => console.log("Create admin"));
