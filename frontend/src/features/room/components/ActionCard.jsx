import React from "react";

const ActionCard = ({ icon, title, desc, buttonText , onClick }) => {
  return (
    <div className="bg-[#1c253e]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col hover:scale-[1.02] transition-all">
      
      <div className="w-14 h-14 rounded-lg bg-white/10 flex items-center justify-center text-2xl mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold mb-2">{title}</h3>

      <p className="text-white/60 mb-8">{desc}</p>

      <button onClick={onClick} className="mt-auto cursor-pointer w-full py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-purple-400 text-black font-semibold hover:opacity-90">
        {buttonText}
      </button>
    </div>
  );
};

export default ActionCard;