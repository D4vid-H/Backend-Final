import express from "express";
import passport from "passport";
import passportLocal from "passport-local";
import "dotenv/config";
import path from "path";
import prodRoute from "./routers/product.route.js";
import cartRoute from "./routers/cart.route.js";
import userRoute from "./routers/user.route.js";
import configRoute from "./routers/config.route.js";
import config from "./config.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import bcrypt from "bcrypt";
import session from "express-session";
import { fileURLToPath } from "url";
import { UserDao } from "./daos/index.js";
import { getDefault } from "./controllers/defaultControllers.js";
import socket from "./helper/chat.js";
import isLogin from "./middlewares/isLogin.js";
import methodOverride from "method-override";

mongoose.connect(config.mongo.connectDB);

const LocalStrategy = passportLocal.Strategy;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT_DEVELOPER;
const app = express();

const server = app.listen(port, (error) => {
  try {
    console.log(`Servidor On-Line escuchando en port: ${port}`);
  } catch (error) {
    console.log(`Se produjo el siguiente error: ${error}`);
  }
});

socket(server);

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(reqPassword, dbPassword) {
  return bcrypt.compareSync(reqPassword, dbPassword);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride("_method"));

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.connectDB,
      mongoOptions,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      HttpOnly: false,
      secure: false,
      maxAge: 360000,
    },
  })
);

app.set("view engine", "ejs");
app.set("views", __dirname + "../src/views");

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await UserDao.getByUser(username);
      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username: username,
        password: hashPassword(password),
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        cellphone: req.body.cellphone,
        rol: "generic",
      };

      const createdUser = /* new (newUser) */ await UserDao.addUser(newUser);

      done(null, createdUser);
    } catch (err) {
      console.log("Error registrando usuario", err);
      done("Error en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const user = await UserDao.getByUser(username);

      if (!user || !isValidPassword(password, user.password)) {
        return done(null, null);
      }

      done(null, user);
    } catch (err) {
      console.log("Error login", err);
      done("Error login", null);
    }
  }
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  UserDao.findById(id, done);
});

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/chat", isLogin, express.static(path.join(__dirname, "../public/")));

app.use("/", userRoute);
app.use("/product", prodRoute);
app.use("/cart", cartRoute);
app.use("/config", configRoute);
app.use("/", getDefault);

export default __dirname;
