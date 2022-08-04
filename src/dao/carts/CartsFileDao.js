import FileContainer from "../../containers/FileContainer.js";

export default class CartsFileDao extends FileContainer {
  constructor(path) {
    super(`${path}/carts.json`);
  }
}
