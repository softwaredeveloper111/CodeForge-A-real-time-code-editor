import React, { useState } from "react";
import useRoom from "../hooks/useRoom";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const { handleJoinRoom } = useRoom();

  return (
    <div className="bg-[#1c253e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-4">
      
      <div className="flex-1">
        <p className="text-xs text-white/50 mb-2 uppercase">
          Have an invite code?
        </p>

        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="w-full px-5 py-3 rounded-xl bg-[#11192e] text-white outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      <button
        onClick={() => handleJoinRoom(roomId)}
        className="px-6 py-3 cursor-pointer rounded-xl bg-[#222b47] hover:bg-white/10"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoom;