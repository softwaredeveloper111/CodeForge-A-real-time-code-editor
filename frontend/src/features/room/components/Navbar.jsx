import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#070d1f]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-between items-center px-8 py-4">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]">
          CodeForge
        </span>

        <div className="hidden md:flex gap-6">
          <a className="text-[#a3a6ff] border-b-2 border-[#a3a6ff] pb-1">
            Projects
          </a>

          <Link to="/my-rooms" className="text-[#dfe4fe]/60 hover:text-white">
             Rooms
          </Link>
    
          <Link to="/user/works" className="text-[#dfe4fe]/60 hover:text-white">
            works
          </Link>

          
          <a className="text-[#dfe4fe]/60 hover:text-white">Team</a>
          <a className="text-[#dfe4fe]/60 hover:text-white">Docs</a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-xl hover:bg-[#222b47]">🔔</button>
        <button className="p-2 rounded-xl hover:bg-[#222b47]">⚙️</button>

        <img
          src="https://i.pravatar.cc/100"
          className="w-10 h-10 rounded-full border border-white/10"
        />
      </div>
    </nav>
  );
};

export default Navbar;
