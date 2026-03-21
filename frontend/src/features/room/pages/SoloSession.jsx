import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { toast } from "react-toastify";

// ── Relative time formatter ───────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  const now = Date.now();
  const past = new Date(dateStr).getTime();
  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hour${Math.floor(diff / 3600) > 1 ? "s" : ""} ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day${Math.floor(diff / 86400) > 1 ? "s" : ""} ago`;
  return new Date(dateStr).toLocaleDateString();
};

// ── Language config ───────────────────────────────────────────────────────────
const LANG_CONFIG = {
  javascript: {
    color: "text-yellow-400",
    badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    glow: "group-hover:shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    border: "group-hover:border-yellow-500/40",
    placeholder: [
      [{ color: "text-yellow-400", text: "// Write your JavaScript here" }],
      [{ color: "text-slate-400", text: 'console.log("Hello, World!");' }],
    ],
  },
  python: {
    color: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    glow: "group-hover:shadow-[0_0_15px_rgba(52,211,153,0.1)]",
    border: "group-hover:border-emerald-500/40",
    placeholder: [
      [{ color: "text-emerald-400", text: "# Write your Python here" }],
      [{ color: "text-slate-400", text: 'print("Hello, World!")' }],
    ],
  },
  cpp: {
    color: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    glow: "group-hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]",
    border: "group-hover:border-indigo-500/40",
    placeholder: [
      [{ color: "text-indigo-400", text: "#include <iostream>" }],
      [{ color: "text-slate-400", text: 'int main() { std::cout << "Hello!"; }' }],
    ],
  },
  java: {
    color: "text-orange-400",
    badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    glow: "group-hover:shadow-[0_0_15px_rgba(251,146,60,0.1)]",
    border: "group-hover:border-orange-500/40",
    placeholder: [
      [{ color: "text-orange-400", text: "public class Main {" }],
      [{ color: "text-slate-400", text: '  public static void main(String[] args) {}' }],
    ],
  },
};

// ── Code Preview Lines ────────────────────────────────────────────────────────
// Shows first 2 non-empty lines of saved code, or placeholder if empty
const CodePreview = ({ code, language }) => {
  const config = LANG_CONFIG[language] || LANG_CONFIG["javascript"];

  if (!code || code.trim() === "" || code.trim() === "// Start coding...") {
    // Show placeholder
    return (
      <div className="mt-4 p-4 bg-black/40 rounded-lg border border-slate-800/50">
        {config.placeholder.map((line, i) => (
          <code key={i} className="text-sm font-mono block truncate mt-1 first:mt-0 opacity-40 italic">
            {line.map((part, j) => (
              <span key={j} className={part.color}>{part.text}</span>
            ))}
          </code>
        ))}
      </div>
    );
  }

  // Show first 2 non-empty lines of real saved code
  const lines = code
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim() !== "")
    .slice(0, 2);

  return (
    <div className="mt-4 p-4 bg-black/40 rounded-lg border border-slate-800/50">
      {lines.map((line, i) => (
        <code key={i} className={`text-sm font-mono block truncate mt-1 first:mt-0 ${config.color}`}>
          {line}
        </code>
      ))}
    </div>
  );
};

// ── Session Card ──────────────────────────────────────────────────────────────
const SessionCard = ({ room, onContinue }) => {
  const config = LANG_CONFIG[room.language] || LANG_CONFIG["javascript"];

  return (
    <div
      className={`group rounded-xl p-6 border border-white/[0.06] transition-all duration-300 ${config.border} ${config.glow}`}
      style={{ background: "rgba(17,25,46,0.8)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Left — name + code preview */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={`text-xl font-bold truncate ${config.color}`}>
              {room.name}
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-slate-500 shrink-0">
              ID: {room.roomId}
            </span>
          </div>

          <CodePreview code={room.code} language={room.language} />
        </div>

        {/* Right — badge + time + button */}
        <div className="flex flex-col items-end gap-6 min-w-[140px] shrink-0">
          <span className={`px-3 py-1 text-xs rounded-full border capitalize ${config.badge}`}>
            {room.language === "cpp" ? "C++" : room.language.charAt(0).toUpperCase() + room.language.slice(1)}
          </span>

          <div className="flex flex-col items-end">
            <p className="text-[11px] text-slate-500 mb-3">
              Last edited: {timeAgo(room.updatedAt)}
            </p>
            <button
              onClick={() => onContinue(room.roomId)}
              className="flex items-center gap-2 px-5 py-2 bg-[#070d1f] hover:bg-[#222b47] text-slate-200 border border-slate-700 rounded-lg transition-all"
            >
              <span className="text-sm font-semibold">Continue</span>
              <span className="text-sm">→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// ── Sidebar ───────────────────────────────────────────────────────────────────
const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 z-50 bg-[#11192e] shadow-2xl shadow-black/40">
    <div className="mb-8 p-3 bg-indigo-500/10 rounded-xl">
      <span className="text-indigo-400 text-2xl font-black">{"</>"}</span>
    </div>

    <nav className="flex flex-col gap-6 items-center flex-1">
      {[
        { icon: "💻", label: "Editor", active: true },
        { icon: "🗄️", label: "Repository" },
        { icon: "🚀", label: "Deployment" },
        { icon: "📊", label: "Analytics" },
      ].map(({ icon, label, active }) => (
        <button
          key={label}
          className={`group relative p-3 w-20 flex justify-center transition-all duration-200
            ${active
              ? "bg-indigo-500/10 text-indigo-400 border-r-2 border-indigo-500"
              : "text-slate-500 hover:text-slate-300 hover:bg-[#222b47] hover:translate-x-1"
            }`}
        >
          <span className="text-xl">{icon}</span>
          <span className="absolute left-full ml-4 px-2 py-1 bg-[#222b47] text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
            {label}
          </span>
        </button>
      ))}
    </nav>

    <div className="flex flex-col gap-2 items-center mt-auto w-full">
      <div className="px-4 w-full flex flex-col items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
        <div className="h-24 w-1 bg-slate-800 rounded-full relative overflow-hidden">
          <div className="absolute bottom-0 w-full bg-indigo-500 h-[20%]" />
        </div>
      </div>
      <button className="group relative text-slate-500 hover:text-slate-300 p-3 w-20 flex justify-center hover:bg-[#222b47] transition-all">
        <span className="text-xl">❓</span>
        <span className="absolute left-full ml-4 px-2 py-1 bg-[#222b47] text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">Support</span>
      </button>
    </div>
  </aside>
);

// ── Topbar ────────────────────────────────────────────────────────────────────
const Topbar = () => (
  <header className="flex justify-between items-center w-full px-8 h-16 border-b border-slate-800/50 bg-[#070d1f] sticky top-0 z-40">
    <div className="flex items-center gap-8 flex-1">
      <Link to="/" className="text-xl font-black text-indigo-400 tracking-tight">
        CodeForge
      </Link>
    </div>
  </header>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const SoloSessions = () => {
  const navigate = useNavigate();
  const { handleUserRoomList } = useRoom();

  const [rooms, setRooms] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchSoloRooms = async () => {
      setFetchLoading(true);
      const res = await handleUserRoomList();

      if (Array.isArray(res)) {
        // Filter only solo rooms
        const soloRooms = res.filter((r) => r.isSolo === true);
        // Sort by most recently updated
        soloRooms.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setRooms(soloRooms);
      }
      setFetchLoading(false);
    };

    fetchSoloRooms();
  }, []);

  const handleContinue = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#070d1f] text-white">
      <Sidebar />

      <main className="flex-1 ml-20 flex flex-col h-screen overflow-hidden">
        <Topbar />

        <div className="flex-1 overflow-y-auto p-8 lg:px-12 relative">

          {/* Page Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-2">
                Solo Sessions
              </h1>
              <p className="text-white/50 font-medium">
                Your personal scratchpads. Continue where you left off.
              </p>
            </div>
          </div>

          {/* Loading */}
          {fetchLoading && (
            <div className="flex items-center justify-center mt-32">
              <div className="w-8 h-8 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Empty State */}
          {!fetchLoading && rooms.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-32 text-white/40 gap-4">
              <span className="text-5xl">💻</span>
              <p className="text-lg">No solo sessions yet</p>
              <p className="text-sm">Go to Home and click "Start Solo Session"</p>
              <Link
                to="/"
                className="mt-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl text-sm font-semibold transition"
              >
                Start Coding →
              </Link>
            </div>
          )}

          {/* Session Cards */}
          {!fetchLoading && rooms.length > 0 && (
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              {rooms.map((room) => (
                <SessionCard
                  key={room._id}
                  room={room}
                  onContinue={handleContinue}
                />
              ))}

              {/* Storage card */}
              <div
                className="mt-12 p-8 rounded-xl flex flex-col md:flex-row items-center justify-between border border-dashed border-indigo-500/30"
                style={{ background: "rgba(17,25,46,0.8)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-6 mb-6 md:mb-0">
                  <div className="h-16 w-16 bg-[#222b47] rounded-2xl flex items-center justify-center text-3xl">
                    ☁️
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Running out of space?</h4>
                    <p className="text-sm text-slate-400">0.8GB used of 10.0GB total capacity</p>
                  </div>
                </div>
                <button className="px-8 py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-indigo-500/20">
                  Upgrade Pro Plan
                </button>
              </div>
            </div>
          )}

          {/* BG blobs */}
          <div className="fixed top-1/4 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="fixed bottom-1/4 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-0" />
        </div>
      </main>
    </div>
  );
};

export default SoloSessions;