import { Server } from "socket.io";
import { ChatDao } from "../daos/index.js";

const socket = (expressServer) => {
  const io = new Server(expressServer);

  io.on("connection", async (socket) => {
    console.log("Se conecto un usuario nuevo", socket.id);

    let arrayMsj = await ChatDao.chatGetMsg();
    socket.emit("server:msgs", arrayMsj);

    socket.on("client:msg", async (msgInfo) => {
      await ChatDao.chatAddMsg(msgInfo);
      let arrayMsj = await ChatDao.chatGetMsg();
      socket.emit("server:msgs", arrayMsj);
    });
  });
};

export default socket;
