import { config } from "dotenv";
config({ path: process.ENV });
import FirebaseContainer from "../../containers/FirebaseContainer.js";

export default class CartsFirebaseDao extends FirebaseContainer {
  constructor(collection) {
    super(process.env.FIREBASE_COLLECTION_CARTS || collection);
  }
}
