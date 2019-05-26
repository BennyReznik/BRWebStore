import { Application } from "express";
import { getProducts, getProductsById } from "../routes";

function setup(app: Application) {
  app.get("/api/products", getProducts);

  app.get("/api/products/:id", getProductsById);
}

export default setup;
