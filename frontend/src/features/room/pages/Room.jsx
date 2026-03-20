import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";

import { getSocket } from "../services/room.socket";
import { setConnection } from "../room.slice.js";
import { getRoomApi } from "../services/room.api";

const Room = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);
  console.log("USER FROM REDUX:", user)

  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);

  const isRemoteChange = useRef(false);

  useEffect(() => {
  const fetchRoom = async () => {
    const res = await getRoomApi(roomId);
    if (res?.data?.participants) {
      setUsers(res.data.participants); // ✅ existing users load
    }
  };
  fetchRoom();
}, [roomId]);



  useEffect(() => {
    const socket = getSocket();


  console.log("socket object:", socket);
  console.log("socket.connected:", socket?.connected); // ← key check
  console.log("roomId:", roomId);
  console.log("user:", user);
  

    if (!socket || !roomId || !user) {
      console.log("❌ Early return");
      return;
    }

      console.log("✅ About to emit join-room");
  socket.emit("join-room", { roomId, user });

    // ✅ JOIN ROOM
    socket.emit("join-room", { roomId, user });
    dispatch(setConnection(true));

    // ✅ SYNC CODE
    socket.on("sync-code", (incomingCode) => {
      isRemoteChange.current = true;
      setCode(incomingCode);
    });

    socket.on("code-update", (incomingCode) => {
      isRemoteChange.current = true;
      setCode(incomingCode);
    });

    // ✅ USERS (NO DUPLICATE)
    socket.on("user-joined", (newUser) => {
      setUsers((prev) => {
        const exists = prev.find((u) => u._id === newUser._id);
        if (exists) return prev;
        return [...prev, newUser];
      });
    });

    socket.on("user-left", (leftUser) => {
      setUsers((prev) =>
        prev.filter((u) => u._id !== leftUser._id)
      );
    });

    return () => {
      socket.emit("leave-room", { roomId, user });

      socket.off("sync-code");
      socket.off("code-update");
      socket.off("user-joined");
      socket.off("user-left");

      dispatch(setConnection(false));
    };
  }, [roomId, user]);

  // ✅ SEND CODE
  const handleChange = (value) => {
    setCode(value);

    if (!isRemoteChange.current) {
      const socket = getSocket();

      socket.emit("code-change", {
        roomId,
        code: value,
      });
    }

    isRemoteChange.current = false;
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-[#020617] p-4 border-r border-gray-800">
        <h2 className="text-lg font-semibold">Room</h2>
        <p className="text-xs break-all">{roomId}</p>

        <h3 className="mt-6 text-sm text-gray-400">Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.username}</li>
          ))}
        </ul>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          theme="vs-dark"
          onChange={handleChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
};

export default Room;