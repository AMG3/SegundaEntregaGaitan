import { config } from "dotenv";
config({ path: process.ENV });
import MongoDbContainer from "../../containers/MongoDbContainer.js";

export default class ProductsMongoDBDao extends MongoDbContainer {
  constructor(database, collection) {
    super(
      process.env.MONGO_DATABASE || database,
      process.env.MONGO_COLLECTION_PRODUCTS || collection
    );
  }
}
