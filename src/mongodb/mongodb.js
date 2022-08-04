import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoConfig = {
  connectionString: process.env.MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  },
};

const client = new MongoClient(
  mongoConfig.connectionString,
  mongoConfig.options
);

await client.connect();

export { client };
