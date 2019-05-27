import { store } from "../store/index";
import { IProduct } from "../models";
import { Request, Response, NextFunction } from "express";

const products = store.products;

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.send(products);
};

const getProductsById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id);

  res.send(existing);
};

const createProduct = (req: Request, res: Response) => {
  const newProduct = req.body as IProduct;

  newProduct.id = (getMaxId() + 1).toString();

  products.push(newProduct);
  res.status(201).send(newProduct);
};

const updateProduct = (req: Request, res: Response) => {
  const id: string = req.params.id;
  const product = products.find(p => p.id === id.toString());

  const productToUpdate = req.body as IProduct;
  productToUpdate.id = id;
  Object.assign(product, productToUpdate);

  res.status(200).send(product);
};

const deleteProduct = (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === req.params.id);

  if (index !== 0 && !index) {
    res.sendStatus(404);
  } else {
    products.splice(index, 1);
    res.sendStatus(204);
  }
};

const productNotFound = (req: Request, res: Response, next: NextFunction) => {
  const product = products.find(p => p.id === req.params.id);
  if (product) {
    next();
  } else {
    res.status(404).send("product not found");
  }
};

const checkIfIdIsNumber = (req: Request, res: Response, next: NextFunction) => {
  if (isNaN(req.params.id)) {
    res.status(400).send("id is not a number");
  } else {
    next();
  }
};

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

function getMaxId() {
  let maxId = 1;

  products.forEach(e => {
    let id = Number.parseInt(e.id, undefined);
    if (id > maxId) {
      maxId = id;
    }
  });

  return maxId;
}

export {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
  isProductNameLengthValid,
  checkIfIdIsNumber,
  productNotFound
};
