import express from "express";
import productCheck from "../middlewares/productCheck.js";
import isAdmin from "../middlewares/isAdmin.js";
import isLogin from "../middlewares/isLogin.js";
import {
  getProducts,
  postProducts,
  putProducts,
  deleteProducts,
  getAddProducts,
  getProductsById,
  getProductsByCategory,
} from "../controllers/productsControllers.js";
const prodRouter = express.Router();

prodRouter.get("/list", getProducts);
prodRouter.get("/add", isAdmin, getAddProducts);
prodRouter.get("/", getProductsByCategory);
prodRouter.get("/:id", getProductsById);
prodRouter.post("/add", isLogin, isAdmin, productCheck, postProducts);
prodRouter.put("/", isLogin, isAdmin, productCheck, putProducts);
prodRouter.delete("/", isLogin, isAdmin, deleteProducts);

export default prodRouter;
