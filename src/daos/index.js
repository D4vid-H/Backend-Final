import "dotenv/config";

let ProductoDao;
let CarritoDao;
let UserDao;
let ChatDao;
let Opcion = process.env.DATABASE;

switch (Opcion) {
  /*   case "firebase":
    const { default: ProductoDacFirebase } = await import(
      "./productos/ProductosDaoFirebase.js"
    );
    const { default: CarritoDacFirebase } = await import(
      "./carritos/CarritosDaoFirebase.js"
    );

    ProductoDao = new ProductoDacFirebase();
    CarritoDao = new CarritoDacFirebase();

    break; */

  case "mongoose":
    const { default: ProductoDaoMongoDB } = await import(
      "./productos/producto.schema.js"
    );
    const { default: CarritoDaoMongoDB } = await import(
      "./carritos/carrito.schema.js"
    );
    const { default: UsersDaoMongoDB } = await import("./user/user.schema.js");
    const { default: ChatDaoMongoDB } = await import("./chat/chat.schema.js");

    ProductoDao = new ProductoDaoMongoDB();
    CarritoDao = new CarritoDaoMongoDB();
    UserDao = new UsersDaoMongoDB();
    ChatDao = new ChatDaoMongoDB();

    break;

  /* case "sql":
    const { default: ProductDaoSQL } = await import(
      "./productos/ProductosDaoSQL.js"
    );
    const { default: CarritoDaoSQL } = await import(
      "./carritos/CarritosDaoSQL.js"
    );

    ProductoDao = new ProductDaoSQL();
    CarritoDao = new CarritoDaoSQL();

    break;

    default :
    const { default: ProductDacArchivo } = await import(
      "./productos/ProductosDaoArchivo.js"
    );
    const { default: CarritoDacArchivo } = await import(
      "./carritos/CarritosDaoArchivo.js"
    );

    ProductoDao = new ProductDacArchivo();
    CarritoDao = new CarritoDacArchivo();

    break; */
}

export { ProductoDao, CarritoDao, UserDao, ChatDao };
