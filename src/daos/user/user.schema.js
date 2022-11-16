import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class UsersDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("User", {
      username: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String, required: false },
      address: { type: String, required: false },
      cellphone: { type: Number, required: false },
      name: { type: String, required: false },
      age: { type: Number, required: false },
      rol: { type: String, required: true },
    });
  }
}
