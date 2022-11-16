import express from "express";
import {
  getCart,
  postCreateCart,
  putCart,
  deleteCart,
  emptyCart,
} from "../controllers/cartControllers.js";
const cartRouter = express.Router();

cartRouter.get("/", getCart);

cartRouter.post("/", postCreateCart);

cartRouter.put("/product", putCart);

cartRouter.delete("/", emptyCart);

cartRouter.delete("/product", deleteCart);

export default cartRouter;
