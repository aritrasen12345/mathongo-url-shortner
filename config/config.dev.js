import dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ENV = process.env.NODE_ENV || "prod";

const configDev = {
  PORT: process.env.DEV_PORT,
  DB_NAME: process.env.DEV_DB_NAME,
  DB_URL: process.env.DEV_DB_URL,
  DB_PASSWORD: process.env.DEV_DB_PASSWORD,
  JWT_ACTIVATE: process.env.DEV_JWT_ACTIVATE,
  REDIS_URL: process.env.DEV_REDIS_URL,
};

export default configDev;
