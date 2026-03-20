import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import JoinRoom from "../components/JoinRoom";
import useRoom from "../hooks/useRoom";
import  CreateRoomModal  from "../components/CreateRoomModal";

const Home = () => {
  const { handleCreateRoom } = useRoom();
  const [openModal, setOpenModal] = useState(false);

  const handleSoloSession = async () => {
  const res = await handleCreateRoom({
    name: `Solo-${user.username}`,
    description: "Solo coding session",
    language: "javascript",
  });

  if (res.success) {
    navigate(`/room/${res.roomId}`); 
  }
};

  return (
    <div className="min-h-screen bg-[#070d1f] text-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 blur-[120px] opacity-20 rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 blur-[120px] opacity-20 rounded-full" />

      <Navbar />

      <main className="pt-32 px-6 max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          Start your coding session
        </h1>

        <p className="text-white/60 mb-12">
          Code solo or collaborate with your team in real-time
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <ActionCard
            icon="💻"
            title="Start Coding"
            desc="Jump into a private coding session instantly."
            buttonText="Start Solo Session"
            onClick={handleCreateRoom}
          />

          <ActionCard
            icon="👥"
            title="Create Room"
            desc="Invite others and collaborate in real-time."
            buttonText="Create Room"
            onClick={() => setOpenModal(true)}
          />
        </div>

        <JoinRoom />

        <footer className="mt-16 text-white/40 text-sm flex justify-center gap-6">
          <span>● Global Clusters: Optimal</span>
          <span>🔒 End-to-End Encrypted</span>
          <span>v2.4.0</span>
        </footer>
      </main>

      <CreateRoomModal isOpen={openModal} onClose={() => setOpenModal(false)} />

    </div>
  );
};

export default Home;
