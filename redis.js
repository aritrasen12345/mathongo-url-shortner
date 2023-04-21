import { createClient } from "redis";
import util from "util";
import config from "./config/config.js";

// REDIS CONNECTION
const client = createClient({
  url: config.REDIS_URL || config.DEV_REDIS_URL,
});

client.get = util.promisify(client.get);

export default client;
