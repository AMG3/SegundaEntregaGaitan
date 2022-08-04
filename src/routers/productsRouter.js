import { Router } from "express";
import { productsDao } from "../dao/index.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  const products = await productsDao.getAll();
  res.json(products);
});

productsRouter.get("/:id", async (req, res) => {
  const products = await productsDao.getById(req.params.id);
  res.json(products);
});

productsRouter.post("/", async (req, res) => {
  const newProduct = await productsDao.save(req.body);
  res.json(newProduct);
});

productsRouter.put("/:id", async (req, res) => {
  const updatedProduct = await productsDao.update(req.body);
  res.json(updatedProduct);
});

productsRouter.delete("/:id", async (req, res) => {
  const deletedProduct = await productsDao.deleteById(req.params.id);
  res.json(deletedProduct);
});

export { productsRouter };
