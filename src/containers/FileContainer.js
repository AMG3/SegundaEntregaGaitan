import { promises as fs } from "fs";

export default class FileContainer {
  constructor(path) {
    this.path = path;
  }

  async getById(id) {
    const elements = await this.getAll();
    const found = elements.find((o) => o.id == id);
    if (found) {
      return found;
    } else {
      return { Error: "Elemento no encontrado" };
    }
  }

  async getAll() {
    try {
      const elements = await fs.readFile(this.path, "utf-8");
      return JSON.parse(elements);
    } catch (error) {
      return [];
    }
  }

  async save(obj) {
    const elements = await this.getAll();
    let newId;
    if (elements.length == 0) {
      newId = 1;
    } else {
      newId = elements[elements.length - 1].id + 1;
    }
    const newObj = { ...obj, id: newId };
    elements.push(newObj);
    try {
      await fs.writeFile(this.path, JSON.stringify(elements, null, 2));
      return { Estado: "Guardado" };
    } catch (error) {
      return { Error: `Error al guardar: ${error}` };
    }
  }

  async update(elem) {
    const elements = await this.getAll();
    const index = elements.findIndex((o) => o.id == elem.id);
    if (index === -1) {
      return { Error: `No se encontró el id ${elem.id}` };
    } else {
      elements[index] = elem;
      try {
        await fs.writeFile(this.path, JSON.stringify(elements, null, 2));
        return { Estado: "Actualizado" };
      } catch (error) {
        return { Error: `Error al actualizar ${error}` };
      }
    }
  }

  async deleteById(id) {
    const elements = await this.getAll();
    const index = elements.findIndex((o) => o.id == id);
    if (index === -1) {
      return { Error: `No se encontró el id ${id}` };
    }
    const deleted = elements.splice(index, 1)[0];
    try {
      await fs.writeFile(this.path, JSON.stringify(elements, null, 2));
      return { Estado: "Eliminado" };
    } catch (error) {
      return { Error: `Error al borrar ${error}` };
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.path, JSON.stringify([], null, 2));
      return { Estado: "Borrado" };
    } catch (error) {
      return { Error: `Error al borrar todo:  ${error}` };
    }
  }
}
