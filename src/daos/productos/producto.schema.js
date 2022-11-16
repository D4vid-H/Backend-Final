import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class ProductoDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("productos", {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      category: { type: String, required: false },
      picturUrl: { type: String, required: false },
      price: { type: Number, required: true },
      description: { type: String, required: true },
    });
  }
}
