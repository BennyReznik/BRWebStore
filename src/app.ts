import * as express from "express";
import * as cors from "cors";
import { productsController } from "./controllers";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

productsController(app);

export { app };
