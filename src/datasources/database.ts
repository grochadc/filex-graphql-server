import pgPromise from "pg-promise";
import path from "path";
const { QueryFile } = pgPromise;
require("dotenv").config();

const initOptions = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
};

console.log("Initializing database");
const pgp = pgPromise();
const db = pgp(initOptions);

export function sqlFile(file: string) {
  const fullPath = path.join(__dirname, file);
  const options = {
    minify: true
  };
  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    console.error(qf.error);
  }

  return qf;
}

export default db;
