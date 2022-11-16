import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class CarritoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("carritos", {
      user: { type: String, required: true },
      timestamp: { type: Date, required: false },
      products: { type: Array, required: true },
    });
  }
}
