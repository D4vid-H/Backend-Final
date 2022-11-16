import path from "path";
import { ProductoDao } from "../daos/index.js";

const getProducts = async (req, res) => {
  try {
    const allProducts = await ProductoDao.getAll();
    res.json(allProducts);
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const getProductsById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.send("id is invalid");

    const product = await ProductoDao.getById(id);

    if (product) {
      res.json(product);
    } else {
      res.json({ message: "Id inexistente" });
    }
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    if (!category) return res.send("category is not exist");

    const products = await ProductoDao.getByCategory(category);

    if (products) {
      res.json(products);
    } else {
      res.json({ message: "categoria inexistente" });
    }
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const getAddProducts = async (req, res) => {
  res.render(path.join(process.cwd(), "./src/views/addProduct.ejs"));
};

const postProducts = async (req, res) => {
  try {
    const newProducts = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body?.category ? req.body?.category : "generic",
      picturUrl: req.body?.picturUrl ? req.body?.picturUrl : "",
    };
    const newProduct = await ProductoDao.add(newProducts);
    res.json({ message: "Product added", product: newProduct });
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500).json({ error: "error server" });
  }
};

const putProducts = async (req, res) => {
  try {
    const id = Number(req.body.id);

    if (!id) return res.send("id is invalid");

    const product = req.body;
    const updatedProduct = await ProductoDao.set(id, product);

    if(!updatedProduct) return res.json({
      menssage: "product id does not exist",
    });

    res.json({
      menssage: "product updated successfully",
    });
    
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const id = Number(req.body.id);

    if (!id) return res.send("id is invalid");

    const deletedData = await ProductoDao.deleteById(id);
    if (!deletedData)
      return res.json({
        menssage: "product id does not exist",
      });

    res.json({
      menssage: "product removed successfully",
    });
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export {
  getProducts,
  getAddProducts,
  getProductsById,
  postProducts,
  putProducts,
  deleteProducts,
  getProductsByCategory,
};
