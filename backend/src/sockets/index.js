import { Server } from 'socket.io';
import  {registerSocketHandlers} from "./handler.js";


let io;

export const initSocket = (server) => {
  io = new Server(server, {
  cors: {
    origin: "https://codeforge-a-real-time-code-editor.onrender.com", // ✅ exact origin
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