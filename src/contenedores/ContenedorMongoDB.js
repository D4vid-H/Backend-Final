import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongo.connectDB);

export default class ContenedorMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async add(product) {
    try {
      const datos = await this.coleccion.find();
      if (datos.length === 0) {
        product.id = 1;
        product.timestamp = Date.now();
        let newProduct = await this.coleccion.create(product);
        return newProduct;
      } else {
        product.id = datos[datos.length - 1].id + 1;
        product.timestamp = Date.now();
        let newProduct = await this.coleccion.create(product);
        return newProduct;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getAll() {
    try {
      const data = await this.coleccion.find();

      if (data.length === 0) return `There is no products.`;

      return data;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getById(id) {
    try {
      const data = await this.coleccion.findOne({ id });

      if (!data) return `There is no product with id: ${id}`;

      return data;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getByCategory(category) {
    try {
      const products = await this.coleccion.find({ category });

      if (!products) return `There is no product with category: ${category}`;

      return products;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async set(id, product) {
    try {
      product.timestamp = Date.now();
      const dataUpdated = await this.coleccion.updateOne({ id }, product);

      if (dataUpdated.matchedCount === 0) return false;

      return true;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      const deletedData = await this.coleccion.deleteOne({ id });

      if (deletedData.deletedCount === 0) return false;

      return deletedData;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async addCart(user) {
    try {
      if (!user) return "user not exist";

      const cart = { user, timestamp: Date.now(), products: [] };
      await this.coleccion.create(cart);
    } catch (error) {
      console.log(`Error addCart: ${error}`);
    }
  }

  async getAllCart(user) {
    try {
      const cart = await this.coleccion.findOne({ user: user });

      if (!cart) return `The cart does not exist.`;

      return cart.products;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async productsInCart(id) {
    try {
      const cart = await this.coleccion.find({ id });

      if (cart.products.length === 0) return "Empty cart.";

      return cart.products;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async setCart(user, product) {
    try {
      const cart = await this.coleccion.findOne({ user });
      if (cart) {
        const prodInCart = cart.products.find((prod) => prod.id === product.id);

        if (prodInCart) {
          prodInCart.cant = product.cant;
        } else {
          cart.products.push(product);
        }

        const res = await this.coleccion.updateOne(
          { _id: cart._id },
          { products: cart.products }
        );
        return { messagge: "Product added successfully", res };
      } else {
        return `The cart does not exist.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async toEmptyCart(user) {
    try {
      const cart = await this.coleccion.findOne({ user });
      if (cart) {
        const emptyCart = await this.coleccion.updateOne(
          { id: cart.id },
          { products: [] }
        );
        return emptyCart;
      } else {
        return `The cart does not exist.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async deleteProdByCartId(user, productId) {
    try {
      const cart = await this.coleccion.findOne({ user });
      if (cart) {
        const cartUpdated = cart.products.filter(
          (prod) => prod.id !== productId
        );
        const res = await this.coleccion.updateOne(
          { id: cart.id },
          { products: cartUpdated }
        );
        return { messages: "Product removed from cart successfully", res };
      } else {
        return `The cart does not exist.`;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async getByUser(username) {
    try {
      const foundUser = await this.coleccion.findOne({ username });

      if (!foundUser) return false;

      return foundUser;
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  async addUser(user) {
    const newUser = await this.coleccion.create(user);
    return newUser;
  }

  async chatAddMsg(msg) {
    await this.coleccion.create(msg);
  }

  async chatGetMsg() {
    const messages = await this.coleccion.find();
    return messages;
  }
}
