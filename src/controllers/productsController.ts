import { Application } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid
} from "../routes";

function setup(app: Application) {
  app.get("/api/products", getProducts);

  app.get("/api/products/:id", getProductsById);

  app.post("/api/products", isProductNameLengthValid, createProduct);

  app.put("/api/products/:id", updateProduct);

  app.delete("/api/products/:id", deleteProduct);
}

export default setup;
