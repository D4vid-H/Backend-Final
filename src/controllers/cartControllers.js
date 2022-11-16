import { ProductoDao, CarritoDao } from "../daos/index.js";

const getCart = async (req, res) => {
  try {
    const user = req.session?.passport?.user?.username;
    const cart = await CarritoDao.getAllCart(user);

    if (!cart) return res.json({ message: "carrito vacio" });

    res.json(cart);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const postCreateCart = async (username) => {
  try {
    await CarritoDao.addCart(username);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
  }
};

const putCart = async (req, res) => {
  try {
    const user = req.session?.passport?.user?.username;
    const productId = Number(req.body.productId);
    const cant = Number(req.body.cant);

    if (!productId) return res.json({ message: "id not exist" });

    let prodExist = await ProductoDao.getById(productId);

    const prodUpdate = {
      _id: prodExist._id,
      id: prodExist.id,
      name: prodExist.name,
      category: prodExist.category,
      picturUrl: prodExist.picturUrl,
      price: prodExist.price,
      description: prodExist.description,
      cant,
    };

    if (prodExist.id) {
      const cart = await CarritoDao.setCart(user, prodUpdate);
      return res.json(cart);
    }
    res.json("ERROR");
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const deleteCart = async (req, res) => {
  try {
    const user = req.session.passport?.user?.username;

    const productId = Number(req.body.productId);
    if (!productId) return res.json({ message: "id not exist" });

    const prodRemoved = await CarritoDao.deleteProdByCartId(user, productId);

    res.json(prodRemoved);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const emptyCart = async (req, res) => {
  try {
    const user = req.body.user;

    if (!user) return res.json({ message: "user not exist" });

    const cart = await CarritoDao.toEmptyCart(user);

    res.json(cart);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export { getCart, postCreateCart, putCart, deleteCart, emptyCart };
