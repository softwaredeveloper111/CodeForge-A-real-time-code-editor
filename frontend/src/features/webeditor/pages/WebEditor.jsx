import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackFileExplorer,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
} from "@codesandbox/sandpack-react";

// ── Default content for new files by extension ────────────────────────────────
const getDefaultContent = (filename) => {
  const ext = filename.split(".").pop();
  switch (ext) {
    case "html": return `<!DOCTYPE html>\n<html>\n  <head><title>${filename}</title></head>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>`;
    case "css":  return `/* ${filename} */\n\nbody {\n  margin: 0;\n  padding: 0;\n}\n`;
    case "js":   return `// ${filename}\n\nconsole.log("Hello from ${filename}");\n`;
    case "jsx":  return `// ${filename}\nimport React from "react";\n\nconst Component = () => {\n  return <div>Hello</div>;\n};\n\nexport default Component;\n`;
    case "ts":   return `// ${filename}\n\nconst greeting: string = "Hello";\nconsole.log(greeting);\n`;
    case "tsx":  return `// ${filename}\nimport React from "react";\n\nconst Component: React.FC = () => {\n  return <div>Hello</div>;\n};\n\nexport default Component;\n`;
    case "json": return `{\n  "name": "my-project"\n}\n`;
    default:     return `// ${filename}\n`;
  }
};

// ── File & Folder Creator (uses useSandpack inside Provider) ──────────────────
const FileManager = () => {
  const { sandpack } = useSandpack();

  const [mode, setMode] = useState(null); // "file" | "folder" | null
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    const name = inputVal.trim();
    if (!name) {
      setError("Name cannot be empty");
      return;
    }

    if (mode === "file") {
      // File must have extension
      if (!name.includes(".")) {
        setError("File must have an extension e.g. index.js");
        return;
      }
      const path = name.startsWith("/") ? name : `/${name}`;
      if (sandpack.files[path]) {
        setError("File already exists");
        return;
      }
      sandpack.addFile(path, getDefaultContent(name));
      sandpack.openFile(path);
    }

    if (mode === "folder") {
      // Folder — create a placeholder .gitkeep file inside
      const folderName = name.startsWith("/") ? name : `/${name}`;
      const placeholder = `${folderName}/.gitkeep`;
      if (sandpack.files[placeholder]) {
        setError("Folder already exists");
        return;
      }
      sandpack.addFile(placeholder, "");
    }

    // Reset
    setInputVal("");
    setError("");
    setMode(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCreate();
    if (e.key === "Escape") { setMode(null); setInputVal(""); setError(""); }
  };

  return (
    <div className="flex flex-col border-b border-slate-800 bg-[#0a0f1e] shrink-0">

      {/* Buttons row */}
      <div className="flex items-center gap-1 px-2 py-1.5">
        <span className="text-[10px] text-white/30 uppercase tracking-widest mr-auto pl-1">
          Explorer
        </span>
        <button
          onClick={() => { setMode("file"); setInputVal(""); setError(""); }}
          title="New File"
          className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition text-sm"
        >
          📄+
        </button>
        <button
          onClick={() => { setMode("folder"); setInputVal(""); setError(""); }}
          title="New Folder"
          className="p-1 rounded hover:bg-white/10 text-white/50 hover:text-white transition text-sm"
        >
          📁+
        </button>
      </div>

      {/* Input row — shown when mode is active */}
      {mode && (
        <div className="px-2 pb-2 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-xs text-white/40 w-4">
              {mode === "file" ? "📄" : "📁"}
            </span>
            <input
              autoFocus
              value={inputVal}
              onChange={(e) => { setInputVal(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              placeholder={mode === "file" ? "filename.js" : "folder-name"}
              className="flex-1 bg-[#11192e] text-white text-xs px-2 py-1 rounded border border-indigo-500/50 outline-none focus:border-indigo-400"
            />
            <button
              onClick={handleCreate}
              className="text-xs px-2 py-1 bg-indigo-500 hover:bg-indigo-400 rounded text-white transition"
            >
              ✓
            </button>
            <button
              onClick={() => { setMode(null); setInputVal(""); setError(""); }}
              className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-white/50 transition"
            >
              ✕
            </button>
          </div>
          {error && (
            <p className="text-red-400 text-[10px] pl-5">{error}</p>
          )}
          <p className="text-white/20 text-[10px] pl-5">
            {mode === "file"
              ? "Tip: use / for subfolders e.g. components/Button.jsx"
              : "Tip: use / for nested e.g. components/ui"}
          </p>
        </div>
      )}
    </div>
  );
};

// ── Custom File Explorer with FileManager on top ──────────────────────────────
const CustomFileExplorer = () => (
  <div className="flex flex-col" style={{ height: "100%", width: "200px", minWidth: "200px" }}>
    <FileManager />
    <div className="flex-1 overflow-hidden">
      <SandpackFileExplorer style={{ height: "100%" }} />
    </div>
  </div>
);

// ── Template options ──────────────────────────────────────────────────────────
const TEMPLATES = [
  { id: "static",   label: "HTML / CSS / JS", icon: "🌐", template: "static"   },
  { id: "react",    label: "React",           icon: "⚛️", template: "react"    },
  { id: "react-ts", label: "React + TS",      icon: "🔷", template: "react-ts" },
  { id: "vue",      label: "Vue",             icon: "💚", template: "vue"      },
  { id: "vanilla",  label: "Vanilla JS",      icon: "🟨", template: "vanilla"  },
];

// ── Main Component ────────────────────────────────────────────────────────────
const WebEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTemplate, setActiveTemplate]     = useState(null);

  const handleStart = () => {
    if (!selectedTemplate) return;
    setActiveTemplate(selectedTemplate);
  };

  // ── Template Selection Screen ──
  if (!activeTemplate) {
    return (
      <div className="min-h-screen bg-[#070d1f] text-white flex flex-col">

        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 blur-[120px] opacity-20 rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500 blur-[120px] opacity-20 rounded-full" />
        </div>

        <nav className="fixed top-0 w-full z-50 bg-[#070d1f]/80 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-8 py-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]">
              CodeForge
            </Link>
            <div className="hidden md:flex gap-6 text-sm">
              <Link to="/"           className="text-white/60 hover:text-white">Projects</Link>
              <Link to="/my-rooms"   className="text-white/60 hover:text-white">Rooms</Link>
              <Link to="/user/works" className="text-white/60 hover:text-white">Works</Link>
              <Link to="/web-editor" className="text-[#a3a6ff] border-b-2 border-[#a3a6ff] pb-1">Web IDE</Link>
            </div>
          </div>
        </nav>

        <main className="pt-32 px-6 max-w-4xl mx-auto w-full text-center">
          <h1 className="text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#a3a6ff] to-[#c180ff]">
            Web IDE
          </h1>
          <p className="text-white/50 mb-12">Choose a template to start building</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTemplate(t.template)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border cursor-pointer transition-all
                  ${selectedTemplate === t.template
                    ? "border-[#a3a6ff] bg-indigo-500/10 ring-2 ring-[#a3a6ff]"
                    : "border-white/10 bg-[#1c253e]/60 hover:border-white/30 hover:bg-[#1c253e]"
                  }`}
              >
                <span className="text-3xl">{t.icon}</span>
                <span className="text-sm font-semibold text-white/80">{t.label}</span>
                {selectedTemplate === t.template && (
                  <span className="text-xs text-[#a3a6ff] font-bold">✓ Selected</span>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleStart}
            disabled={!selectedTemplate}
            className="px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition cursor-pointer"
          >
            Start Building →
          </button>
        </main>
      </div>
    );
  }

  // ── Editor Screen ──
  return (
    <div className="flex flex-col h-screen bg-[#070d1f] text-white overflow-hidden">

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#020617] border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a3a6ff] to-[#c180ff]">
            CodeForge
          </Link>
          <span className="text-xs text-white/30 uppercase tracking-widest">Web IDE</span>
        </div>
        <button
          onClick={() => setActiveTemplate(null)}
          className="text-xs px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition border border-white/10"
        >
          ← Change Template
        </button>
      </div>

      {/* Sandpack */}
      <div className="flex-1 overflow-hidden">
        <SandpackProvider
          template={activeTemplate}
          theme="dark"
          options={{
            showNavigator: true,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
          }}
        >
          <SandpackLayout style={{ height: "calc(100vh - 45px)", borderRadius: 0, border: "none" }}>
            <CustomFileExplorer />
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              showInlineErrors
              wrapContent
              style={{ height: "100%" }}
            />
            <SandpackPreview
              showNavigator
              style={{ height: "100%" }}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>

    </div>
  );
};

export default WebEditor;