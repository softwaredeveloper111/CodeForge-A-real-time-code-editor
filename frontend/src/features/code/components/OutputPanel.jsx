import React from "react";


const OutputPanel = ({ output, isRunning, error }) => {
  return (
    <div className="h-48 bg-[#020617] border-t border-slate-800 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800">
        <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
          Output
        </span>
        {isRunning && (
          <span className="text-xs text-indigo-400 animate-pulse">
            Running...
          </span>
        )}
      </div>

      {/* OUTPUT */}
      <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm">
        {isRunning && (
          <p className="text-indigo-400 animate-pulse">Executing code...</p>
        )}
        {error && !isRunning && (
          <p className="text-red-400">{error}</p>
        )}
        {output && !isRunning && (
          <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
        )}
        {!output && !isRunning && !error && (
          <p className="text-white/20">Run your code to see output here...</p>
        )}
      </div>

    </div>
  );
};



export default OutputPanel;