import React, { useEffect, useRef } from "react";
import useChat from "../hooks/useChat";

const ChatPanel = ({ roomId }) => {
  const { messages, input, setInput, sendMessage } = useChat(roomId);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex w-64 flex-col h-full bg-[#0a0f1e] border-l border-slate-800">

      {/* HEADER */}
      <div className="px-4 py-3 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-white/70">Chat</h3>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-white/30 text-xs text-center mt-4">
            No messages yet
          </p>
        )}

        {messages.map((msg) => (
          <div key={msg._id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img
                src={msg.sender?.avatar}
                alt={msg.sender?.username}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="text-xs text-indigo-400 font-semibold">
                {msg.sender?.username}
              </span>
            </div>
            <p className="text-sm text-white/80 ml-7">{msg.text}</p>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="px-4 py-3 border-t border-slate-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="flex-1 bg-[#11192e] text-sm text-white px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/50 placeholder:text-white/30"
        />
        <button
          onClick={sendMessage}
          className="px-3 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg text-sm font-semibold transition-colors"
        >
          →
        </button>
      </div>

    </div>
  );
};

export default ChatPanel;