import { client } from "../mongodb/mongodb.js";
import { ObjectId } from "mongodb";

export default class MongoDbContainer {
  constructor(database, collection) {
    this.database = database;
    this.collection = collection;
  }

  async getById(id) {
    try {
      const result = await client
        .db(this.database)
        .collection(this.collection)
        .find({ _id: ObjectId(id) })
        .toArray();
      if (result.length > 0) {
        return result;
      } else {
        return { Error: "Elemento no encontrado" };
      }
    } catch (error) {
      return { Error: `${error}` };
    }
  }

  async getAll() {
    try {
      const result = await client
        .db(this.database)
        .collection(this.collection)
        .find()
        .toArray();
      return result;
    } catch (error) {
      return { Error: `${error}` };
    }
  }

  async save(newElement) {
    try {
      const result = await client
        .db(this.database)
        .collection(this.collection)
        .insertOne(newElement);
      return { Estado: "Guardado" };
    } catch (error) {
      return { "Error al guardar ": `${error}` };
    }
  }

  async update(element) {
    try {
      const data = Object.entries(element);
      const index = data.findIndex((elem) => elem.includes("_id"));
      const borrado = data.splice(index, 1);
      const newData = Object.fromEntries(data);
      const result = await client
        .db(this.database)
        .collection(this.collection)
        .updateOne({ _id: ObjectId(element._id) }, { $set: newData });
      return { Estado: "Actualizado" };
    } catch (error) {
      return { "Error al actualizar ": `${error}` };
    }
  }

  async deleteById(id) {
    try {
      const result = await client
        .db(this.database)
        .collection(this.collection)
        .deleteOne({ _id: ObjectId(id) });
      return { Estado: "Borrado" };
    } catch (error) {
      return { "Error al borrar ": `${error}` };
    }
  }

  async deleteAll() {
    try {
      await client.db(this.database).collection(this.collection).drop();
      return { Estado: "Borrado" };
    } catch (error) {
      return { "Error ": ` ${error}` };
    }
  }
}
