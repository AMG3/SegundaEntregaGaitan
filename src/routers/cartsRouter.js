import { Router } from "express";
import { cartsDao } from "../dao/index.js";

const cartsRouter = Router();

cartsRouter.get("/", async (req, res) => {
  const carts = await cartsDao.getAll();
  res.json(carts);
});

cartsRouter.get("/:id", async (req, res) => {
  const carts = await cartsDao.getById(req.params.id);
  res.json(carts);
});

cartsRouter.post("/", async (req, res) => {
  const newCart = await cartsDao.save(req.body);
  res.json(newCart);
});

cartsRouter.put("/:id", async (req, res) => {
  const updatedCart = await cartsDao.update(req.body);
  res.json(updatedCart);
});

cartsRouter.delete("/:id", async (req, res) => {
  const deletedCart = await cartsDao.deleteById(req.params.id);
  res.json(deletedCart);
});

export { cartsRouter };
