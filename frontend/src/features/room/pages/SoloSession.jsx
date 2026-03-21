import React from "react";
import { useNavigate,Link } from "react-router-dom";

// ─── Static mock data ───────────────────────────────────────────────────────
const MOCK_SESSIONS = [
  {
    id: "CF-8291",
    name: "Solo-roko",
    language: "JavaScript",
    langColor: "indigo",
    lastEdited: "2 hours ago",
    codeLines: [
      { parts: [{ color: "text-indigo-400", text: "const" }, { color: "text-slate-400", text: " sum = (a, b) => a + b;" }] },
      { parts: [{ color: "text-slate-400", text: "console.log(sum(" }, { color: "text-purple-400", text: "10, 20" }, { color: "text-slate-400", text: "));" }] },
    ],
  },
  {
    id: "CF-4402",
    name: "Backend-refactor",
    language: "Go",
    langColor: "purple",
    lastEdited: "5 hours ago",
    codeLines: [
      { parts: [{ color: "text-purple-400", text: "func " }, { color: "text-indigo-400", text: "HandleRequest" }, { color: "text-slate-400", text: "(w http.ResponseWriter, r *http.Request) {" }] },
      { parts: [{ color: "text-slate-400", text: '      fmt.Fprintf(w, ' }, { color: "text-emerald-400", text: '"Hello from CodeForge!"' }, { color: "text-slate-400", text: ")" }] },
    ],
  },
  {
    id: "CF-1198",
    name: "Auth-logic",
    language: "Python",
    langColor: "emerald",
    lastEdited: "yesterday",
    codeLines: [
      { parts: [{ color: "text-indigo-400", text: "def " }, { color: "text-emerald-400", text: "validate_token" }, { color: "text-slate-400", text: "(token: str):" }] },
      { parts: [{ color: "text-purple-400", text: "      return " }, { color: "text-slate-400", text: 'jwt.decode(token, secret, algorithms=[' }, { color: "text-emerald-400", text: '"HS256"' }, { color: "text-slate-400", text: "])" }] },
    ],
  },
];

// ─── Color maps ─────────────────────────────────────────────────────────────
const langBadge = {
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const cardHover = {
  indigo: "hover:border-indigo-500/30 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_15px_rgba(163,166,255,0.15)]",
  purple: "hover:border-purple-500/30 group-hover:border-purple-500/50 group-hover:shadow-[0_0_15px_rgba(193,128,255,0.15)]",
  emerald: "hover:border-emerald-500/30 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.15)]",
};

const nameColor = {
  indigo: "text-indigo-300",
  purple: "text-purple-300",
  emerald: "text-emerald-300",
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = () => (
  <aside className="fixed left-0 top-0 h-full w-20 flex flex-col items-center py-6 z-50 bg-[#11192e] shadow-2xl shadow-black/40">
    {/* Logo */}
    <div className="mb-8 p-3 bg-indigo-500/10 rounded-xl">
      <span className="text-indigo-400 text-2xl font-black">{"</>"}</span>
    </div>

    {/* Nav Icons */}
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

    {/* Bottom */}
    <div className="flex flex-col gap-2 items-center mt-auto w-full">
      {/* Storage bar */}
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

      <button className="group relative text-red-500 hover:text-red-400 p-3 w-20 flex justify-center hover:bg-red-500/10 transition-all">
        <span className="text-xl">🚪</span>
        <span className="absolute left-full ml-4 px-2 py-1 bg-[#222b47] text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">Sign Out</span>
      </button>
    </div>
  </aside>
);

// ─── Topbar ───────────────────────────────────────────────────────────────────
const Topbar = () => (
  <header className="flex justify-between items-center w-full px-8 h-16 border-b border-slate-800/50 bg-[#070d1f] sticky top-0 z-40">
    <div className="flex items-center gap-8 flex-1">
      <Link to="/" className="text-xl font-black text-indigo-400 tracking-tight">CodeForge</Link>
    </div>

  </header>
);

// ─── Session Card ─────────────────────────────────────────────────────────────
const SessionCard = ({ session }) => {
  const { name, id, language, langColor, lastEdited, codeLines } = session;

  return (
    <div
      className={`group glass-card rounded-xl p-6 border border-white/[0.06] transition-all duration-300 ${cardHover[langColor]}`}
      style={{ background: "rgba(17,25,46,0.8)", backdropFilter: "blur(12px)" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* Left — name + code preview */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={`text-xl font-bold ${nameColor[langColor]}`}>{name}</h3>
            <span className="text-[10px] uppercase tracking-widest text-slate-500">ID: {id}</span>
          </div>

          <div className="mt-4 p-4 bg-black/40 rounded-lg border border-slate-800/50">
            {codeLines.map((line, i) => (
              <code key={i} className="text-sm font-mono block truncate mt-1 first:mt-0">
                {line.parts.map((part, j) => (
                  <span key={j} className={part.color}>{part.text}</span>
                ))}
              </code>
            ))}
          </div>
        </div>

        {/* Right — badge + time + button */}
        <div className="flex flex-col items-end gap-6 min-w-[140px]">
          <span className={`px-3 py-1 text-xs rounded-full border ${langBadge[langColor]}`}>
            {language}
          </span>

          <div className="flex flex-col items-end">
            <p className="text-[11px] text-slate-500 mb-3">Last edited: {lastEdited}</p>
            <button
              className={`flex items-center gap-2 px-5 py-2 bg-[#070d1f] hover:bg-[#222b47] text-slate-200 border border-slate-700 rounded-lg transition-all ${cardHover[langColor]}`}
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

// ─── Main Page ────────────────────────────────────────────────────────────────
const SoloSessions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#070d1f] text-white">
      <Sidebar />

      <main className="flex-1 ml-20 flex flex-col h-screen overflow-hidden">
        <Topbar />

        {/* Canvas */}
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

          {/* Session Cards */}
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {MOCK_SESSIONS.map((session) => (
              <SessionCard key={session.id} session={session} />
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

          {/* BG blobs */}
          <div className="fixed top-1/4 -right-24 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="fixed bottom-1/4 -left-24 w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none z-0" />
        </div>
      </main>
    </div>
  );
};

export default SoloSessions;