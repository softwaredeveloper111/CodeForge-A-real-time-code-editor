import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Editor from "@monaco-editor/react";

import { getSocket } from "../services/room.socket";
import { setConnection } from "../room.slice.js";
import { getRoomApi } from "../services/room.api";
import ChatPanel from "../../chat/components/chatPanel";
import OutputPanel from "../../code/components/OutputPanel.jsx";
import useCode from "../../code/hooks/useCode.js";

const Room = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.user);

  const [code, setCode] = useState("// Start coding...");
  const [users, setUsers] = useState([]);
  const [language, setLanguage] = useState("javascript");
  const [isSolo, setIsSolo] = useState(false);

  const isRemoteChange = useRef(false);

  const { output, isRunning, error, runCode } = useCode();

  // ── Fetch room details (participants + saved code + language) ──
  useEffect(() => {
    const fetchRoom = async () => {
      const res = await getRoomApi(roomId);
      if (res?.data?.participants) setUsers(res.data.participants);
      if (res?.data?.code)        setCode(res.data.code);
      if (res?.data?.language)    setLanguage(res.data.language);
      if (res?.data?.isSolo !== undefined) setIsSolo(res.data.isSolo); // ✅ only new line
    };
    fetchRoom();
  }, [roomId]);

  // ── Socket setup ──
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !roomId || !user) return;

    socket.emit("join-room", { roomId, user });
    dispatch(setConnection(true));

    socket.on("sync-code", (incomingCode) => {
      isRemoteChange.current = true;
      setCode(incomingCode);
    });

    socket.on("code-update", (incomingCode) => {
      isRemoteChange.current = true;
      setCode(incomingCode);
    });

    socket.on("user-joined", (newUser) => {
      setUsers((prev) => {
        const exists = prev.find((u) => u._id === newUser._id);
        if (exists) return prev;
        return [...prev, newUser];
      });
    });

    socket.on("user-left", (leftUser) => {
      setUsers((prev) => prev.filter((u) => u._id !== leftUser._id));
    });

    return () => {
      socket.emit("leave-room", { roomId, user });
      socket.off("sync-code");
      socket.off("code-update");
      socket.off("user-joined");
      socket.off("user-left");
      dispatch(setConnection(false));
    };
  }, [roomId, user]);

  // ── Editor change → broadcast ──
  const handleChange = (value) => {
    setCode(value);
    if (!isRemoteChange.current) {
      const socket = getSocket();
      socket.emit("code-change", { roomId, code: value });
    }
    isRemoteChange.current = false;
  };

  // ── Run code ──
  const handleRunCode = () => {
    runCode({ code, language });
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white overflow-hidden">

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-lg font-bold text-indigo-400">CodeForge</Link>
        </div>

        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="flex cursor-pointer items-center gap-2 px-4 py-1.5 bg-green-500 hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-semibold text-black transition-colors"
        >
          {isRunning ? (
            <>
              <span className="animate-spin">⏳</span>
              Running...
            </>
          ) : (
            <>▶ Run</>
          )}
        </button>
      </div>

      {/* ── MAIN AREA ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR — only for collaborative rooms */}
        {!isSolo && (
          <div className="w-56 bg-[#020617] p-4 border-r border-slate-800 flex flex-col shrink-0">
            <Link to="/my-rooms" className="text-sm hover:text-green-400 duration-700 font-semibold text-white/50 uppercase tracking-widest mb-1">
              Room
            </Link>
            <p className="text-xs text-white/30 font-mono break-all mb-6">{roomId}</p>

            <h3 className="text-xs text-white/40 uppercase tracking-widest mb-3">
              Online
            </h3>
            <ul className="flex flex-col gap-3">
              {users.map((u) => (
                <li key={u._id} className="flex items-center gap-2">
                  <img
                    src={u.avatar}
                    alt={u.username}
                    className="w-6 h-6 rounded-full object-cover border border-white/10"
                  />
                  <span className="text-sm text-white/70">{u.username}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* EDITOR + OUTPUT PANEL */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={code}
              theme="vs-dark"
              onChange={handleChange}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
              }}
            />
          </div>

          <OutputPanel
            output={output}
            isRunning={isRunning}
            error={error}
          />
        </div>

        {/* RIGHT CHAT — only for collaborative rooms */}
        {!isSolo && (
          <div className="w-72 shrink-0">
            <ChatPanel roomId={roomId} />
          </div>
        )}

      </div>
    </div>
  );
};

export default Room;