import { store } from "../store/index";
import { IProduct } from "../models";
import { Request, Response, NextFunction } from "express";

const products = store.products;

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.send(products);
};

const getProductsById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  checkIfIdIsNumber(id, res);
  const existing = products.find(p => p.id === id);

  productNotFound(res, existing);

  res.send(existing);
};

const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body as IProduct;

  newProduct.id = (Number(products[products.length - 1].id) + 1).toString();

  products.push(newProduct);
  res.status(201).send(newProduct);
};

const updateProduct = (req: Request, res: Response) => {
  const id: string = req.params.id;
  checkIfIdIsNumber(id, res);
  const product = products.find(p => p.id === id.toString());

  productNotFound(res, product);

  const productToUpdate = req.body as IProduct;
  productToUpdate.id = id;
  Object.assign(product, productToUpdate);

  res.status(400).send(product);
};

const deleteProduct = (req: Request, res: Response) => {
  const id = req.params.id;
  checkIfIdIsNumber(id, res);
  const index = products.findIndex(p => p.id === id.toString());

  if (!index) {
    res.sendStatus(404);
  }

  products.splice(index, 1);
  res.sendStatus(204);
};

function productNotFound(res: Response, existing: IProduct | undefined) {
  if (!existing) {
    // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
    res.sendStatus(404);
    return;
  }
}

function checkIfIdIsNumber(id: any, res: Response) {
  if (isNaN(id)) {
    return true;
  }
  res.sendStatus(400);
  return false;
}

const isProductNameLengthValid = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newProduct = req.body as IProduct;
  if (newProduct.name.length >= 3) {
    next();
  } else {
    res.status(409).send("Name length must be more than three characters");
  }
};

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid
};
