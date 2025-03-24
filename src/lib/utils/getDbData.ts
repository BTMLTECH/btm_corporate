import dotenv from "dotenv";

dotenv.config()

export function getDbInfo() {
  const dbUrl = process.env.NODE_ENV === "production" ? process.env.DB_HOST : "localhost";
  const dbPort = process.env.NODE_ENV === "production" ? process.env.DB_PORT : 5432;
  const dbUser = process.env.NODE_ENV === "production" ? process.env.DB_USER : "postgres";
  const dbPwd =
    process.env.NODE_ENV === "production" ? process.env.DB_PASSWORD : "postgres";
  const dbName = process.env.NODE_ENV === "production" ? process.env.DB_NAME : "postgres";
  const ssl = process.env.NODE_ENV === 'production' ? true : false // Because we are using railway for now.

  return {
    dbUrl,
    dbPort,
    dbUser,
    dbPwd,
    dbName,
    ssl
  };
}
