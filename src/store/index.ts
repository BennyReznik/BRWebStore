import { IProduct } from "../models/product";
import * as products from "./products.json";

interface Store {
  products: IProduct[];
}

const store: Store = {
  products
};

export { store };
