// socket.js
import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://codeforge-a-real-time-code-editor.onrender.com", {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected:", socket.id);
    });
  }

  return socket;
};