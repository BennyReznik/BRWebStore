import { store } from "../store/index";
import { IProduct } from "../models";
import { Request, Response, NextFunction } from "express";

const products = store.products;

const getProducts = (req: Request, res: Response, next: NextFunction) => {
  res.send(products);
};

const getProductsById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const existing = products.find(p => p.id === id) as IProduct;

  productNotFound(res, existing);

  res.send(existing);
};

function productNotFound(res: Response, existing: IProduct) {
  if (!existing) {
    // TODO: sending 404 if existing is not found repeats in other routes, can reuse via multiple route handlers
    res.sendStatus(404);
    return;
  }
}

export { getProducts, getProductsById };
