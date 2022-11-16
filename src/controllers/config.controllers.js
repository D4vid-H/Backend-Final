import "dotenv/config";
import configServer from "../config.js";
import path from "path";

const getConfig = (req, res) => {
  try {
    const config = {
      production: {
        title: "Production",
        port: configServer.production.port,
        server: configServer.production.server,
        email: configServer.production.email,
      },
      developer: {
        title: "Developer",
        port: configServer.developer.port,
        server: configServer.developer.server,
        email: configServer.developer.email,
      },
    };

    res.render(path.join(process.cwd(), "./src/views/config.ejs"), {
      config,
    });
  } catch (error) {
    console.log(`se produjo el siguiente error: ${error}`);
    res.sendStatus(500);
  }
};

export default getConfig;
