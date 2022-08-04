let productsDao, cartsDao;
const mechanism = process.env.PERSISTANCE_MECHANISM; // Cambiar la variable de entorno entre file | memory | firebase | mongodb

switch (mechanism) {
  case "file":
    const { default: ProductsFileDao } = await import(
      "./products/ProductsFileDao.js"
    );
    const { default: CartsFileDao } = await import("./carts/CartsFileDao.js");
    productsDao = new ProductsFileDao("./database");
    cartsDao = new CartsFileDao("./database");
    console.log("Persistencia seleccionada: archivo");
    break;
  case "firebase":
    const { default: ProductsFirebaseDao } = await import(
      "./products/ProductsFirebaseDao.js"
    );
    const { default: CartsFirebaseDao } = await import(
      "./carts/CartsFirebaseDao.js"
    );
    productsDao = new ProductsFirebaseDao();
    cartsDao = new CartsFirebaseDao();
    console.log("Persistencia seleccionada: firebase");
    break;
  case "mongodb":
    const { default: ProductsMongoDBDao } = await import(
      "./products/ProductsMongoDBDao.js"
    );
    const { default: CartsMongoDbDao } = await import(
      "./carts/CartsMongoDbDao.js"
    );
    productsDao = new ProductsMongoDBDao();
    cartsDao = new CartsMongoDbDao();
    console.log("Persistencia seleccionada: mongodb");
    break;
  default:
    const { default: ProductsMemoryDao } = await import(
      "./products/ProductsMemoryDao.js"
    );
    const { default: CartsMemoryDao } = await import(
      "./carts/CartsMemoryDao.js"
    );
    productsDao = new ProductsMemoryDao();
    cartsDao = new CartsMemoryDao();
    console.log("Persistencia seleccionada: memoria");
    break;
}

export { productsDao, cartsDao };
