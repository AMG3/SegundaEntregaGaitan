export default class MemoryContainer {
  constructor() {
    this.elements = [];
  }

  getById(id) {
    const elem = this.elements.find((elem) => elem.id == id);
    if (!elem) {
      return { Error: "Elemento no encontrado" };
    } else {
      return elem;
    }
  }

  getAll() {
    return [...this.elements];
  }

  save(elem) {
    let newId;
    if (this.elements.length == 0) {
      newId = 1;
    } else {
      newId = this.elements[this.elements.length - 1].id + 1;
    }
    const newElem = { ...elem, id: newId };
    this.elements.push(newElem);
    return { Estado: "Guardado", newId };
  }

  update(elem) {
    const index = this.elements.findIndex((p) => p.id === parseInt(elem.id));
    if (index === -1) {
      return { Error: "Elemento no encontrado" };
    } else {
      this.elements[index] = elem;
      return { Estado: "Actualizado" };
    }
  }

  async deleteById(id) {
    const index = await this.elements.findIndex(
      (elem) => elem.id === parseInt(id)
    );
    if (index === -1) {
      return { Error: "Elemento no encontrado" };
    } else {
      const borrado = this.elements.splice(index, 1)[0];
      return { Estado: "Eliminado" };
    }
  }

  deleteAll() {
    this.elements = [];
  }
}
