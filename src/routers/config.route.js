import express from "express";
import getConfig from "../controllers/config.controllers.js";
import isLogin from "../middlewares/isLogin.js";
import isAdmin from "../middlewares/isAdmin.js";



const configRouter = express.Router();

configRouter.get("/", isLogin, isAdmin, getConfig);

export default configRouter;