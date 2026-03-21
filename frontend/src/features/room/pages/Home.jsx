import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import ActionCard from "../components/ActionCard";
import JoinRoom from "../components/JoinRoom";
import useRoom from "../hooks/useRoom";
import CreateRoomModal from "../components/CreateRoomModal";

// ── Language options with Judge0 IDs ──────────────────────────────────────────
const LANGUAGE_OPTIONS = [
  {
    id: "javascript",
    label: "JavaScript",
    icon: "🟨",
    desc: "Node.js runtime",
    judge0Id: 63,
    color: "border-yellow-500/30 hover:border-yellow-400/60 hover:bg-yellow-500/5",
    badge: "bg-yellow-500/10 text-yellow-400",
  },
  {
    id: "python",
    label: "Python",
    icon: "🐍",
    desc: "Python 3",
    judge0Id: 71,
    color: "border-emerald-500/30 hover:border-emerald-400/60 hover:bg-emerald-500/5",
    badge: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: "cpp",
    label: "C++",
    icon: "⚙️",
    desc: "GCC 9.2.0",
    judge0Id: 54,
    color: "border-indigo-500/30 hover:border-indigo-400/60 hover:bg-indigo-500/5",
    badge: "bg-indigo-500/10 text-indigo-400",
  },
  {
    id: "java",
    label: "Java",
    icon: "☕",
    desc: "OpenJDK 13",
    judge0Id: 62,
    color: "border-orange-500/30 hover:border-orange-400/60 hover:bg-orange-500/5",
    badge: "bg-orange-500/10 text-orange-400",
  },
];

// ── Language Selection Modal ──────────────────────────────────────────────────
const SoloLanguageModal = ({ isOpen, onClose, onSelect, loading }) => {
  const [selected, setSelected] = useState(null);

  const handleConfirm = () => {
    if (!selected) {
      toast.warning("Please select a language first");
      return;
    }
    onSelect(selected);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-[#1c253e]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Choose Language</h2>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>
        <p className="text-white/50 text-sm mb-6">
          Select the language for your solo coding session
        </p>

        {/* Language Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {LANGUAGE_OPTIONS.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setSelected(lang.id)}
              className={`relative flex flex-col items-start gap-2 p-4 rounded-xl border cursor-pointer transition-all ${lang.color} ${
                selected === lang.id
                  ? "ring-2 ring-indigo-400 bg-indigo-500/10 border-indigo-400"
                  : "border-white/10 bg-[#11192e]"
              }`}
            >
              {/* Checkmark */}
              {selected === lang.id && (
                <span className="absolute top-2 right-2 text-indigo-400 text-xs font-bold">✓</span>
              )}

              <span className="text-2xl">{lang.icon}</span>
              <div>
                <p className="font-semibold text-white text-sm">{lang.label}</p>
                <p className="text-white/40 text-xs">{lang.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selected || loading}
          className="w-full py-3 rounded-xl cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            "Start Session →"
          )}
        </button>
      </div>
    </div>
  );
};

// ── Home Page ─────────────────────────────────────────────────────────────────
const Home = () => {
  const { handleCreateRoom, loading } = useRoom();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authentication.user);

  const [openModal, setOpenModal] = useState(false);
  const [openLangModal, setOpenLangModal] = useState(false);

  // Called after user picks a language
  const handleSoloSession = async (language) => {
    const res = await handleCreateRoom({
      name: `Solo-${user?.username || "session"}`,
      description: "Solo coding session",
      language,
      isSolo: true,
    });

    if (res.success) {
      setOpenLangModal(false);
      navigate(`/room/${res.roomId}`);
    } else {
      toast.error(res.message || "Failed to create session");
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
            onClick={() => setOpenLangModal(true)}
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

      {/* Create Room Modal */}
      <CreateRoomModal isOpen={openModal} onClose={() => setOpenModal(false)} />

      {/* Solo Language Modal */}
      <SoloLanguageModal
        isOpen={openLangModal}
        onClose={() => setOpenLangModal(false)}
        onSelect={handleSoloSession}
        loading={loading}
      />
    </div>
  );
};

export default Home;