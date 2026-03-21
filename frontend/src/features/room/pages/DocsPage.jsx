import React, { useState } from "react";
import { Link } from "react-router-dom";

const SECTIONS = [
  { id: "introduction",    label: "Introduction",    icon: "ℹ️" },
  { id: "authentication",  label: "Authentication",  icon: "🔒" },
  { id: "rooms",           label: "Real-Time Rooms", icon: "👥" },
  { id: "sync",            label: "Socket Events",   icon: "🔗" },
  { id: "execution",       label: "Tech Stack",      icon: "⚙️" },
];

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="relative bg-black/40 border border-slate-800/50 rounded-lg overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-xs bg-[#222b47] px-3 py-1 rounded-full text-white/50 hover:text-white transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="p-4 font-mono text-sm text-green-400 whitespace-pre-wrap">{code.trim()}</pre>
    </div>
  );
};

const DocsPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070d1f] text-white">

      <style>{`
        .section-heading::after {
          content: '';
          display: block;
          height: 2px;
          width: 0;
          background: #a3a6ff;
          transition: width 0.3s ease;
        }
        .section-heading:hover::after { width: 100%; }
      `}</style>

      {/* TOPBAR */}
      <header className="fixed top-0 w-full z-50 bg-[#070d1f] border-b border-slate-800/50">
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff] tracking-tighter">
              CodeForge
            </Link>
            <span className="h-6 w-px bg-slate-700 hidden md:block" />
            <span className="text-sm uppercase tracking-widest text-slate-400 hidden md:block">
              Documentation
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link to="/docs" className="text-[#a3a6ff] font-bold border-b-2 border-indigo-500 pb-1">Docs</Link>
          
          </nav>
        </div>
      </header>

      <div className="flex pt-16">

        {/* SIDEBAR */}
        <aside className="hidden lg:flex fixed left-0 top-16 h-screen w-64 flex-col bg-[#070d1f] border-r border-slate-800/50 pt-8 overflow-y-auto">
          <div className="px-6 mb-6">
            <h3 className="text-sm uppercase tracking-wider text-[#a3a6ff] font-bold">Documentation</h3>
            <p className="text-xs text-slate-500 mt-1">v2.4.0-stable</p>
          </div>
          <nav className="flex flex-col">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`flex items-center gap-3 px-6 py-3 text-left transition-all duration-200 text-sm uppercase tracking-wider
                  ${activeSection === s.id
                    ? "bg-indigo-500/10 text-[#a3a6ff] border-r-4 border-[#a3a6ff]"
                    : "text-slate-500 hover:bg-[#1c253e] hover:text-slate-200"
                  }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="lg:ml-64 flex-1 px-6 py-12 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto space-y-24">

            {/* ── INTRODUCTION ── */}
            <section id="introduction" className="scroll-mt-24">
              <h1 className="text-5xl font-extrabold tracking-tight mb-4 inline-block section-heading">
                What is CodeForge?
              </h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-3xl mb-8">
                CodeForge is a browser-based real-time collaborative coding platform. Multiple developers can write, edit and run code together in the same room. Built for speed, simplicity and real-time collaboration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: "⚡", title: "Real-Time Code Sync", color: "text-[#a3a6ff]", desc: "Synchronize code across all clients with sub-50ms latency using Socket.IO." },
                  { icon: "🌐", title: "Multi-Language Support", color: "text-[#c180ff]", desc: "JavaScript, Python, C++, Java — all powered by the Judge0 execution engine." },
                  { icon: "💬", title: "Live Contextual Chat", color: "text-[#a3a6ff]", desc: "Integrated real-time chat panel in every collaborative room." },
                  { icon: "▶️", title: "Judge0 Execution", color: "text-[#c180ff]", desc: "Secure sandboxed code execution. Run and debug code without leaving your browser." },
                ].map((f) => (
                  <div key={f.title} className="bg-[#1c253e]/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col gap-3">
                    <span className={`text-3xl ${f.color}`}>{f.icon}</span>
                    <h3 className="text-lg font-bold">{f.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── AUTHENTICATION ── */}
            <section id="authentication" className="scroll-mt-24">
              <h2 className="text-4xl font-bold tracking-tight mb-4 inline-block section-heading">
                Authentication
              </h2>
              <p className="text-white/60 mb-6">
                Secure sessions using JWT-based authentication with httpOnly cookies.
              </p>
              <div className="space-y-4">
                <div className="bg-[#1c253e]/60 border border-white/10 p-5 rounded-2xl">
                  <p className="text-xs font-bold text-[#a3a6ff] uppercase tracking-widest mb-3">Endpoints</p>
                  <CodeBlock code={`POST  /api/auth/register\nPOST  /api/auth/login\nPOST  /api/auth/logout\nGET   /api/auth/me\nPATCH /api/auth/profile/update`} />
                </div>
                <div className="bg-[#1c253e]/60 border border-white/10 p-6 rounded-2xl">
                  <h4 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-[#a3a6ff]">🔐</span> JWT / Cookie Flow
                  </h4>
                  <div className="flex flex-col gap-4 text-white/60 text-sm">
                    {[
                      "Client sends credentials to the auth endpoint.",
                      "Server validates and returns a JWT via Secure httpOnly cookie.",
                      "Socket.IO connection uses the cookie for handshake validation.",
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="w-6 h-6 rounded-full bg-[#a3a6ff]/20 text-[#a3a6ff] flex items-center justify-center font-bold text-xs shrink-0">
                          {i + 1}
                        </span>
                        <p>{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ── ROOMS ── */}
            <section id="rooms" className="scroll-mt-24">
              <h2 className="text-4xl font-bold tracking-tight mb-4 inline-block section-heading">
                Room Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Solo Rooms", color: "text-[#a3a6ff]", desc: "Private sessions for individual prototyping. isSolo: true." },
                  { label: "Collaborative Rooms", color: "text-[#c180ff]", desc: "Multi-user rooms with real-time sync, chat and presence." },
                  { label: "Shareable Link", color: "text-white", desc: "Join any room via /room/:roomId — share the link instantly." },
                ].map((r) => (
                  <div key={r.label} className="bg-[#11192e] border border-white/10 p-5 rounded-xl">
                    <h4 className={`font-bold mb-2 ${r.color}`}>{r.label}</h4>
                    <p className="text-sm text-white/50">{r.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#1c253e]/60 border border-white/10 p-5 rounded-2xl">
                <p className="text-xs font-bold text-[#a3a6ff] uppercase tracking-widest mb-3">Endpoints</p>
                <CodeBlock code={`POST   /api/room                  → Create room\nPOST   /api/room/join/:roomId     → Join room\nGET    /api/room/:roomId         → Get room details\nGET    /api/room/my/rooms        → Get my rooms\nPUT    /api/room/leave/:roomId   → Leave room\nDELETE /api/room/shutdown/:roomId → Delete room (creator only)`} />
              </div>
            </section>

            {/* ── SOCKET EVENTS ── */}
            <section id="sync" className="scroll-mt-24">
              <h2 className="text-4xl font-bold tracking-tight mb-4 inline-block section-heading">
                Socket Events
              </h2>
              <p className="text-white/60 mb-6">
                Real-time sync flow: user types → <code className="text-[#c180ff]">code-change</code> emitted → server broadcasts → peers receive <code className="text-[#c180ff]">code-update</code>.
              </p>
              <div className="overflow-hidden rounded-xl border border-white/10">
                <table className="w-full text-left bg-[#11192e]/50">
                  <thead>
                    <tr className="bg-[#1c253e]">
                      <th className="p-4 text-xs uppercase tracking-widest text-[#a3a6ff]">Event</th>
                      <th className="p-4 text-xs uppercase tracking-widest text-[#a3a6ff]">Direction</th>
                      <th className="p-4 text-xs uppercase tracking-widest text-[#a3a6ff]">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {[
                      ["join-room",        "Client → Server", "Join room, request current code state"],
                      ["code-change",      "Client → Server", "Broadcast code delta to server"],
                      ["code-update",      "Server → Client", "Receive updated code from peers"],
                      ["send-message",     "Client → Server", "Send a chat message"],
                      ["receive-message",  "Server → Client", "Receive chat message"],
                      ["user-joined",      "Server → Client", "Notify room of new participant"],
                      ["user-left",        "Server → Client", "Notify room that user disconnected"],
                      ["sync-code",        "Server → Client", "Initial code sync on join"],
                    ].map(([event, dir, desc]) => (
                      <tr key={event}>
                        <td className="p-4 font-mono text-[#c180ff]">{event}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase text-white/60">
                            {dir}
                          </span>
                        </td>
                        <td className="p-4 text-white/50">{desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ── TECH STACK ── */}
            <section id="execution" className="scroll-mt-24">
              <h2 className="text-4xl font-bold tracking-tight mb-8 inline-block section-heading">
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-2 mb-5">Frontend</h4>
                  <ul className="space-y-4">
                    {[
                      ["React + Vite",      "Rapid UI scaffolding"],
                      ["TailwindCSS",       "Design consistency"],
                      ["Monaco Editor",     "VS Code engine in browser"],
                      ["Socket.IO Client",  "WebSocket abstraction"],
                      ["Redux Toolkit",     "State management"],
                    ].map(([tech, desc]) => (
                      <li key={tech} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a3a6ff] shrink-0" />
                        <span className="font-bold">{tech}</span>
                        <span className="text-white/30">— {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] text-slate-500 border-b border-slate-800 pb-2 mb-5">Backend</h4>
                  <ul className="space-y-4">
                    {[
                      ["Node.js + Express", "Scalable REST API"],
                      ["Socket.IO",         "Real-time engine"],
                      ["MongoDB",           "Persistence layer"],
                      ["Redis",             "Token blacklisting + caching"],
                      ["Judge0 API",        "Sandboxed code execution"],
                      ["ImageKit",          "Avatar storage & CDN"],
                    ].map(([tech, desc]) => (
                      <li key={tech} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c180ff] shrink-0" />
                        <span className="font-bold">{tech}</span>
                        <span className="text-white/30">— {desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* FOOTER */}
            <footer className="pt-12 pb-24 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]">
                  CodeForge
                </span>
                <span className="text-sm text-white/30">© 2026 CodeForge</span>
              </div>
              <div className="flex gap-8 text-white/40 text-sm">
                <a href="#" className="hover:text-[#a3a6ff] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[#a3a6ff] transition-colors">Terms</a>
                <a href="#" className="hover:text-[#a3a6ff] transition-colors">Support</a>
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsPage;