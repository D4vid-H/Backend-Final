import path from "path";
import { CarritoDao } from "../daos/index.js";

const getRegister = (req, res) => {
  res.render(
    path.join(process.cwd(), "./src/views/register.ejs") /* { user } */
  );
};

const failLogin = (req, res) => {
  res.render(
    path.join(process.cwd(), "./src/views/failLogin.ejs") /* { user } */
  );
};

const getLogout = (req, res) => {
  const user = req.session?.passport?.user;
  if (user) {
    req.session.destroy((error) => {
      if (!error) {
        res.render(path.join(process.cwd(), "./src/views/logout.ejs"), {
          user,
        });
      } else {
        res.send({ status: "Logout Error", body: error });
      }
    });
  } else {
    return res.redirect("/home");
  }
};

const getLogin = (req, res) => {
  res.render(path.join(process.cwd(), "./src/views/login.ejs"));
};

const getHome = async (req, res) => {
  let totalPrice = 0;
  const user = req.session?.passport.user;

  const cart = await CarritoDao.getAllCart(user.username);

  if (cart) {
    for (const prod of cart) {
      totalPrice += prod.price * prod.cant;
    }
  }
  res.render(path.join(process.cwd(), "./src/views/home.ejs"), {
    user,
    cart,
    totalPrice,
  });
};

const getUser = (req, res) => {
  const user = req.session?.passport.user;
  res.json(user);
};

export { getRegister, failLogin, getLogout, getLogin, getHome, getUser };
