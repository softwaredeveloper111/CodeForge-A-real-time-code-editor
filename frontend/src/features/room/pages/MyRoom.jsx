import React, { useEffect, useState } from "react";
import useRoom from "../hooks/useRoom";
import { useNavigate } from "react-router-dom";

const MyRooms = () => {
  const { handleUserRoomList } = useRoom();
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await handleUserRoomList();
   
    if (res) {
      setRooms(res);
    }
  };

  console.log(rooms)

  return (
    <div className="min-h-screen bg-[#070d1f] text-white flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#11192e] border-r border-white/10 p-6 hidden md:flex flex-col">
        <h2 className="text-indigo-400 font-bold mb-6">Workspace</h2>

        <div className="flex flex-col gap-4 text-white/60">
          <button className="text-indigo-400 text-left">Projects</button>
          <button className="hover:text-white text-left">Storage</button>
          <button className="hover:text-white text-left">History</button>
        </div>

        <div className="mt-auto text-xs text-white/40">
          © CodeForge
        </div>
      </aside>

      {/* MAIN */}
      <div className="flex-1 p-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold">My Rooms</h1>
            <p className="text-white/60 mt-2 max-w-80">
              Resume your coding sessions or collaborate with your team in hight-performance virtual enviroments.
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold"
          >
            + Create Room
          </button>
        </div>

        {/* ROOMS GRID */}
        {rooms.length === 0 ? (
          <div className="text-center mt-32 text-white/50">
            No rooms found
          </div>
        ) : (
       <div className="grid xl:grid-cols-2 gap-8">
  {rooms.map((room) => {
    const participants = room.participants || [];
    const visibleUsers = participants.slice(0, 4);
    const extraCount = participants.length - 4;

    return (
      <div
        key={room._id}
        className="bg-[#1c253e]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-[1.02] transition"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              {room.name || "Untitled Room"}
            </h2>

            <p className="text-xs text-white/40 mt-1">
              ID: {room.roomId}
            </p>
          </div>

          <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
            {room.language}
          </span>
        </div>

        {/* USERS + META */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            
            {/* AVATAR STACK */}
            <div className="flex -space-x-3">
              {visibleUsers.map((user, index) => (
                <img
                  key={index}
                  src={user.avatar}
                  alt={user.username}
                  className="w-10 h-10 rounded-full border-2 border-[#1c253e] object-cover"
                />
              ))}

              {extraCount > 0 && (
                <div className="w-10 h-10 rounded-full bg-[#222b47] flex items-center justify-center text-xs border-2 border-[#1c253e]">
                  +{extraCount}
                </div>
              )}
            </div>

            {/* CREATED BY */}
            <div>
              <p className="text-xs text-white/50">Created By</p>
              <p className="font-semibold">
                {room.createdBy?.username}
              </p>
            </div>
          </div>

          {/* LAST UPDATED */}
          <div className="text-right">
            <p className="text-xs text-white/50">Last Updated</p>
            <p className="text-sm text-white/70">Recently</p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center border-t border-white/10 pt-4">
          <span className="text-sm text-indigo-400">
            {participants.length} Active
          </span>

          <button
            onClick={() => navigate(`/room/${room.roomId}`)}
            className="px-5 py-2 bg-[#222b47] rounded-lg hover:bg-white/10 flex items-center gap-2"
          >
            Join Room →
          </button>
        </div>
      </div>
    );
  })}
</div>
        )}
      </div>
    </div>
  );
};

export default MyRooms;