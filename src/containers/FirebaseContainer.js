import { db } from "../firebase/firebase.js";

const asObj = (doc) => ({ id: doc.id, ...doc.data() });

export default class FirebaseContainer {
  constructor(collection) {
    this.collection = db.collection(collection);
  }

  async getById(id) {
    try {
      const doc = await this.collection.doc(id).get();
      const result = Object.entries(asObj(doc));
      if (result.length > 1) {
        return asObj(doc);
      } else {
        return { Error: "No se encontró el elemento" };
      }
    } catch (error) {
      return { "Error ": `${error}` };
    }
  }

  async getAll() {
    try {
      const result = [];
      const snapshot = await this.collection.get();
      snapshot.forEach((doc) => {
        result.push(asObj(doc));
      });
      return result;
    } catch (error) {
      return { "Error ": `${error}` };
    }
  }

  async save(nuevoElem) {
    try {
      await this.collection.add(nuevoElem);
      return { Estado: "Guardado" };
    } catch (error) {
      return { "Error al guardar ": `${error}` };
    }
  }

  async update(nuevoElem) {
    try {
      await this.collection.doc(nuevoElem.id).update(nuevoElem);
      return { Estado: "Actualizado" };
    } catch (error) {
      return { "Error al actualizar ": `${error}` };
    }
  }

  async deleteById(id) {
    try {
      await this.collection.doc(id).delete();
      return { Estado: "Eliminado" };
    } catch (error) {
      return { "Error al borrar ": `${error}` };
    }
  }

  async deleteAll() {
    try {
      await this.collection.get().then((res) => {
        res.forEach((element) => {
          element.ref.delete();
        });
      });
      return { Estado: "Eliminado" };
    } catch (error) {
      return { "Error al borrar ": `${error}` };
    }
  }
}
