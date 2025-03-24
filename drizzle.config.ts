import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";
import { getDbInfo } from "./src/lib/utils/getDbData";
// import {
//   DB_HOST,
//   DB_NAME,
//   DB_PASSWORD,
//   DB_PORT,
//   DB_USER,
// } from "$env/static/private";
if (!("DB_HOST" in process.env))
  throw new Error("Database Host not found on");

export default defineConfig({
  schema: ["./src/db/schema"],
  out: "./src/db/migrations",
  breakpoints: true,
  dialect: "postgresql",
  dbCredentials: {
    // host: getDbInfo().dbUrl as string,
    // user: getDbInfo().dbUser as string,
    // password: getDbInfo().dbPwd as string,
    // database: getDbInfo().dbName as string,
    // port: getDbInfo().dbPort as number,
    url: process.env.DB_URL!,
    ssl: process.env.NODE_ENV === "production" ? "require" : false,
  },
  migrations: {
    schema: "public",
  },
}) satisfies Config;
