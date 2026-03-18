import roomModel from "../models/room.model.js";
import messageModel from "../models/message.model.js";


export const registerSocketHandlers = (socket, io) => {
  /**
   * JOIN ROOM
   */
  socket.on("join-room", async ({ roomId, user }) => {
    socket.join(roomId); // user ko room me add kiya

    console.log(`${user.username} joined ${roomId}`);

    // notify others
    socket.to(roomId).emit("user-joined", user);

    // send current room code to new user
    const room = await roomModel.findOne({ roomId });

    if (room) {
      socket.emit("sync-code", room.code);
    }
  });

  /**
   * CODE CHANGE
   */
  let timeout ;
  socket.on("code-change", async ({ roomId, code }) => {
    // broadcast to others
    socket.to(roomId).emit("code-update", code);

    clearTimeout(timeout);

    // DB me latest code save (important for persistence)
    timeout = setTimeout(async () => {
       await roomModel.findOneAndUpdate({ roomId }, { code });
  }, 500);

  });
  
  
  /**
   * LEAVE ROOM
   */
  socket.on("leave-room", ({ roomId, user }) => {
    socket.leave(roomId);

    socket.to(roomId).emit("user-left", user);
  });

  /**
   * DISCONNECT (auto leave)
   */
  socket.on("disconnecting", () => {
    const rooms = socket.rooms;

    rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("user-left", {
          socketId: socket.id,
        });
      }
    });
  });

   /**
   * SEND MESSAGE (DB + Broadcast)
   */
  socket.on("send-message", async ({ roomId, text, user }) => {
    try {
      // 1. save in DB
      const message = await messageModel.create({
        roomId,
        sender: user._id,
        text,
      });

      // 2. populate sender info
      const populatedMessage = await message.populate(
        "sender",
        "username avatar"
      );

      // 3. broadcast to room
      io.to(roomId).emit("receive-message", populatedMessage);

    } catch (error) {
      console.error("Message error:", error.message);
    }
  });



};