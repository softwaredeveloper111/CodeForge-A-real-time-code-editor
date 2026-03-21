import React from "react";
import { Link } from "react-router-dom";

const TEAM = [
  {
    name: "Sourav Giri",
    role: "Co-Founder & CEO",
    bio: "Visionary behind CodeForge. Loves distributed systems.",
    skills: ["Leadership", "System Design", "RAG"],
    avatar: "https://ik.imagekit.io/a490stdk4/FB_IMG_1675573988384.jpg",
  },
  {
    name: "Priya Sharma",
    role: "Lead Frontend Engineer",
    bio: "Crafts pixel-perfect UIs. React wizard and design system enthusiast.",
    skills: ["React", "TailwindCSS", "Figma"],
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Ravi Nair",
    role: "Backend Architect",
    bio: "Keeps the servers happy. Node.js and Kafka are his playgrounds.",
    skills: ["Node.js", "MongoDB", "Kafka"],
    avatar: "https://i.pravatar.cc/150?img=15",
  },
  {
    name: "Sneha Iyer",
    role: "DevOps Engineer",
    bio: "Ships fast, breaks nothing. CI/CD pipelines are her art form.",
    skills: ["Docker", "AWS", "GitHub Actions"],
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    name: "Dev Kapoor",
    role: "AI/ML Engineer",
    bio: "Bringing intelligence to code. Loves LLMs and Python notebooks.",
    skills: ["Python", "TensorFlow", "LangChain"],
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Meera Joshi",
    role: "Product Designer",
    bio: "Turns complex flows into simple, beautiful experiences.",
    skills: ["UX Research", "Figma", "Prototyping"],
    avatar: "https://i.pravatar.cc/150?img=44",
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-[#070d1f] text-white overflow-x-hidden">

      {/* Animated background blobs */}
      <style>{`
        @keyframes float {
          0%   { transform: translate(0, 0); }
          50%  { transform: translate(30px, -50px); }
          100% { transform: translate(0, 0); }
        }
        .blob-1 { animation: float 15s ease-in-out infinite; }
        .blob-2 { animation: float 18s ease-in-out infinite reverse; }

        .glass-card {
          background: rgba(28, 37, 62, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(163,166,255,0.1);
          border-color: rgba(163,166,255,0.3);
        }
        .glass-card:hover .avatar-glow {
          box-shadow: 0 0 25px rgba(163,166,255,0.6);
          border-color: #a3a6ff;
        }
        .avatar-glow {
          transition: all 0.5s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.6s ease forwards;
          opacity: 0;
        }
      `}</style>

      {/* BG blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="blob-1 absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500 blur-[120px] opacity-20 rounded-full" />
        <div className="blob-2 absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500 blur-[120px] opacity-20 rounded-full" />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#070d1f]/80 backdrop-blur-xl flex items-center justify-between px-8 h-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]">
            CodeForge
          </Link>
          <div className="hidden md:flex gap-6 text-sm">
            <Link to="/"         className="text-white/60 hover:text-white transition-colors">Projects</Link>
            <Link to="/my-rooms" className="text-white/60 hover:text-white transition-colors">Rooms</Link>
            <Link to="/team"     className="text-[#a3a6ff] border-b-2 border-[#a3a6ff] pb-1">Team</Link>
            <Link to="/docs"     className="text-white/60 hover:text-white transition-colors">Docs</Link>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Hero */}
        <section className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-[#a3a6ff] to-[#c180ff]">
            Meet the Team
          </h1>
          <p className="text-white/50 text-lg uppercase tracking-widest max-w-2xl mx-auto">
            The minds behind CodeForge
          </p>
        </section>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, i) => (
            <div
              key={member.name}
              className="glass-card rounded-2xl p-8 flex flex-col items-center text-center group fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full border-4 border-white/5 object-cover mb-6 avatar-glow"
              />
              <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
              <p className="text-[#a3a6ff] font-bold uppercase tracking-wider text-sm mb-4">
                {member.role}
              </p>
              <p className="text-white/60 mb-6 text-sm leading-relaxed">{member.bio}</p>
              <div className="mt-auto flex flex-wrap justify-center gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-xs uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/5 py-12 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-[#a3a6ff] font-bold text-xl">CodeForge</span>
            <p className="text-white/30 text-sm uppercase tracking-widest">
              © 2026 CodeForge. Built for the digital architect.
            </p>
          </div>
          <div className="flex gap-8 text-white/30 text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-[#a3a6ff] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#a3a6ff] transition-colors">Terms</a>
            <a target="_blank" href="https://github.com/softwaredeveloper111" className="hover:text-[#a3a6ff] transition-colors">Github</a>
            <a href="#" className="hover:text-[#a3a6ff] transition-colors">Status</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default TeamPage;