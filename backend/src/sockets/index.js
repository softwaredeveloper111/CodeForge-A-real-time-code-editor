import { Server } from 'socket.io';
import  {registerSocketHandlers} from "./handler.js";


let io;

export const initSocket = (server) => {
  io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ✅ exact origin
    credentials: true,               // ✅ yeh bhi add kar
  },
});



io.on('connection', (socket) => {
  console.log(`user connected id:${socket.id}`,);
 

   registerSocketHandlers(socket, io);


  socket.on('disconnect', () => {
    console.log(`user disconnected id:${socket.id}`);
  });
});

return io;


}



 export const getIO = () => io;