import React from "react";



const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070d1f] overflow-hidden animate-fadeIn">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#070d1f] via-[#000] to-[#1a0b2e]" />

      {/* Glow Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-[#a3a6ff] rounded-full blur-[100px] opacity-30 -top-20 -left-20" />
      <div className="absolute w-[350px] h-[350px] bg-[#c180ff] rounded-full blur-[100px] opacity-30 -bottom-20 -right-20" />

      {/* Loader */}
      <div className="relative w-16 h-16">
        
        {/* Outer Ring */}
        <div className="absolute inset-0 border-4 border-[#a3a6ff] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(163,166,255,0.5)]"></div>

        {/* Inner Ring */}
        <div className="absolute inset-2 border-4 border-[#c180ff] border-b-transparent rounded-full animate-spin-reverse shadow-[0_0_15px_rgba(193,128,255,0.5)]"></div>

      </div>
    </div>
  );
};

export default Loader;