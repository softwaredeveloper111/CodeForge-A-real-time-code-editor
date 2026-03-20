import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../room/services/room.socket";
import { getMessagesApi } from "../services/message.api";
import {
  setMessages,
  addMessage,
  clearMessages,
  setLoading,
  setError,
} from "../chat.slice";

const useChat = (roomId) => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.authentication.user);
  const [input, setInput] = useState("");

  // ✅ Purane messages fetch karo
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        dispatch(setLoading(true));
        const res = await getMessagesApi(roomId);
        dispatch(setMessages(res.data));
      } catch (err) {
        dispatch(setError("Messages fetch failed"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMessages();

    // ✅ Room change hone pe messages clear
    return () => {
      dispatch(clearMessages());
    };
  }, [roomId]);

  // ✅ Socket se naye messages suno
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("receive-message", (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  // ✅ Message send
  const sendMessage = () => {
    const text = input.trim();
    if (!text || !roomId || !user) return;

    const socket = getSocket();
    socket.emit("send-message", { roomId, text, user });
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
  };
};

export default useChat;