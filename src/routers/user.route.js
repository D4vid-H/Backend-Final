import sendMailer from "../helper/mail.js";
import passport from "passport";
import { Router } from "express";
import { postCreateCart } from "../controllers/cartControllers.js";
import {
  getRegister,
  failLogin,
  getLogout,
  getLogin,
  getHome,
  getUser,
} from "../controllers/loginControllers.js";
import isLogin from "../middlewares/isLogin.js";
import isNotLogin from "../middlewares/isNotLogin.js";
import userCheck from "../middlewares/userCheck.js";
import "dotenv/config";

const userRoute = Router();

userRoute
  .get("/login", isNotLogin, getLogin)
  .post(
    "/login",
    isNotLogin,
    passport.authenticate("login", { failureRedirect: "/loginfail" }),
    (req, res) => {
      res.redirect("/home");
    }
  );

userRoute.route("/logout").get(getLogout);
userRoute.route("/loginfail").get(failLogin);

userRoute
  .get("/register", isNotLogin, getRegister)
  .post(
    "/register",
    isNotLogin,userCheck,
    passport.authenticate("register"),
    (req, res) => {
      postCreateCart(req.body.username);
      const options = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        age: req.body.age,
        cellphone: req.body.cellphone,
      };
      sendMailer(options);
      res.redirect("/login");
    }
  );

userRoute.route("/user/profile").get(isLogin, getUser);

userRoute.route("/home").get(isLogin, getHome);

export default userRoute;
