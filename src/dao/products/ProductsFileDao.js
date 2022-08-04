import FileContainer from "../../containers/FileContainer.js";

export default class ProductsFileDao extends FileContainer {
  constructor(path) {
    super(`${path}/products.json`);
  }
}
