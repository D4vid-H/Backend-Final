import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

export default class ChatDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super("chat", {
        user: {
          email: { type: String, required: true },
          nombre: { type: String, required: true },
          apellido: { type: String, required: true },
          alias: { type: String, required: true },
        },
        text: { type: String, required: true },
        fechahora: { type: String, required: true },
      });
  }
}
