import "dotenv/config";
import mysql2 from "mysql2/promise";

const {
  DBHOST: dbHost,
  DBUSER: dbUser,
  DBPASSWORD: dbPassword,
  DB: db,
} = process.env;

export default async function execute(query: string): Promise<any> {
  const connection: mysql2.Connection = await mysql2.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: db,
  });
  const [results] = await connection.execute(query);
  return results;
}
