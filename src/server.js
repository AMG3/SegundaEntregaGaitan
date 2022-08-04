import express from "express";
import { productsRouter } from "./routers/productsRouter.js";
import { cartsRouter } from "./routers/cartsRouter.js";

const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/api/products", productsRouter)
  .use("/api/carts", cartsRouter);

export default app;
