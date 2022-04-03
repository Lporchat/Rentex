import { Connection, createConnection, getConnectionOptions } from "typeorm";

//caso não seja informado o host ele deve usar o do docker, caso contrario usara o que sera informado
export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
