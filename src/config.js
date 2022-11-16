import "dotenv/config";

export default {
  mongo: {
    connectDB: process.env.connectDB
  },
  production:{
    port: process.env.PORT_PRODUCTION,
    secret: process.env.SECRET,
    server: process.env.SERVER_URL,
    email: process.env.EMAIL
  },
  developer:{
   port: process.env.PORT_DEVELOPER,
    secret: process.env.SECRET,
    server: process.env.SERVER_URL,
    email: process.env.EMAIL
  }
};
