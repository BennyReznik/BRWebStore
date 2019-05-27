import { Application } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  checkIfIdIsNumber,
  productNotFound
} from "../routes";

function setup(app: Application) {
  app.get("/api/products", getProducts);

  app.get(
    "/api/products/:id",
    productNotFound,
    checkIfIdIsNumber,
    getProductsById
  );

  app.post("/api/products", isProductNameLengthValid, createProduct);

  app.put(
    "/api/products/:id",
    checkIfIdIsNumber,
    productNotFound,
    isProductNameLengthValid,
    updateProduct
  );

  app.delete(
    "/api/products/:id",
    checkIfIdIsNumber,
    productNotFound,
    deleteProduct
  );
}

export default setup;
