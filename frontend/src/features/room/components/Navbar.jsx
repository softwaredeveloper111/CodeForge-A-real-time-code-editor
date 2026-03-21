import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import useAuth from "../../auth/hooks/useAuth";

const Navbar = () => {
  const user = useSelector((state) => state.authentication.user);
  const loading = useSelector((state) => state.authentication.loading);

  const { handleLogout, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  // hidden file input ref
  const fileInputRef = useRef(null);
  // dropdown ref for outside click
  const dropdownRef = useRef(null);

  // ── Close dropdown on outside click ──
  React.useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ── Logout handler ──
  const onLogout = async () => {
    setDropdownOpen(false);
    const res = await handleLogout();
    if (res.success) {
      toast.success("Logged out successfully");
      navigate("/auth/login");
    } else {
      toast.error("Logout failed");
    }
  };

  // ── Trigger file input ──
  const onUploadClick = () => {
    setDropdownOpen(false);
    fileInputRef.current?.click();
  };

  // ── File selected → upload ──
  const onFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset so same file can be re-selected
    e.target.value = "";

    setUploading(true);
    const res = await handleUpdateProfile(file);
    setUploading(false);

    if (res.success) {
      toast.success("Profile picture updated!");
    } else {
      toast.error(res.message || "Upload failed");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#070d1f]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex justify-between items-center px-8 py-4">
      
      {/* LEFT */}
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
            Works
          </Link>
          <Link to="/team" className="text-[#dfe4fe]/60 hover:text-white">Team</Link>
          <Link to="/docs" className="text-[#dfe4fe]/60 hover:text-white">Docs</Link>
          <Link to="/web-editor" className="text-[#dfe4fe]/60 hover:text-white"> Web IDE</Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* AVATAR + DROPDOWN */}
        <div className="relative" ref={dropdownRef}>

          {/* Avatar Button */}
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="relative cursor-pointer rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {/* Uploading spinner overlay */}
            {uploading && (
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center z-10">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <img
              src={user?.avatar}
              alt={user?.username || "avatar"}
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#1c253e] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
              
              {/* User info */}
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.username}
                </p>
                <p className="text-xs text-white/40 truncate">{user?.email}</p>
              </div>

              {/* Upload Option */}
              <button
                onClick={onUploadClick}
                disabled={uploading}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/80 hover:bg-white/5 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-base">🖼️</span>
                {uploading ? "Uploading..." : "Upload Profile Pic"}
              </button>

              {/* Logout Option */}
              <button
                onClick={onLogout}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-base">🚪</span>
                {loading ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;