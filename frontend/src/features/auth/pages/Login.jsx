import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";

const LoginPage = () => {
  const [passwordToggle, setPasswordToggle] = useState(false);

  // FIX: Added watch — was missing, caused crash when resend email clicked
  const { register, handleSubmit, watch } = useForm();

  // FIX: Added handleResendEmail — was missing, caused crash on resend click
  const { handleLogin, handleResendEmail } = useAuth();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.authentication);

  const submitHandler = async (data) => {
    const res = await handleLogin(data);
    if (res.success) {
      toast.success("Logged in successfully");
      navigate("/");
    } else {
      toast.error(res.message);
    }
  };

 const onResendEmail = async () => {
  const identifier = watch("identifier");
  if (!identifier) {
    toast.warning("Please enter your email or username first");
    return;
  }


  const res = await handleResendEmail({ identifier });
  if (res.success) {
    toast.success(res.data?.message || "Verification email sent!");
  } else {
    toast.error(res.message); // "User is already verified" — backend se aayega
  }
};

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#070d1f] text-[#dfe4fe] overflow-hidden font-sans">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#070d1f] via-[#000] to-[#1a0b2e] z-[-2]" />

      {/* Noise */}
      <div className="fixed inset-0 opacity-[0.05] z-[-1] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuConK0IeDkkE1N6LUziEb1_CdjjJ4oKtElFj58WXRF2Bn7Ng6peLg9VcV7NOTLwWaaPf2i4bUMI273hCEylJmc1kVFdvnD_mmAOhn0kU_flRvxli153iYdGJMsJy8A6j-brUusSIBC3-dmeqGbDM5Tgq1JcwDQPFccuAJSA8WjYb7zWhB4ux96P0L-CmInwG-qD5fpiRhf0ukq9SQydjT3jxum0dYhOJEQrKS7h3y5q8pzo-6nwcM_rkEoiLWMsugpQDXT_NV2m-t4H)]" />

      {/* Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-[#a3a6ff] rounded-full blur-[80px] opacity-40 -top-40 -left-20" />
      <div className="absolute w-[400px] h-[400px] bg-[#c180ff] rounded-full blur-[80px] opacity-40 -bottom-20 -right-20" />
      <div className="absolute w-[300px] h-[300px] bg-[#6063ee] rounded-full blur-[80px] opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Main Container */}
      <main className="w-full max-w-[440px] px-6 py-12">
        <div className="relative p-8 md:p-10 rounded-xl bg-[rgba(28,37,62,0.7)] backdrop-blur-[24px] border border-[#a3a6ff1a] shadow-2xl overflow-hidden">
          {/* Top Border Glow */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#a3a6ff66] to-transparent" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-[#9396ff] flex items-center justify-center mb-6 shadow-lg shadow-[#a3a6ff33]">
              <span className="material-symbols-outlined text-3xl text-black">
                terminal
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-sm text-[#a5aac2]">
              Login to continue coding in real-time
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-[#6f758b] ml-1">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                  mail
                </span>
                <input
                  {...register("identifier", { required: "Email or username is required" })}
                  type="text"
                  placeholder="architect@ethercode.dev or architect"
                  className="w-full bg-[#1c253e] border border-[#41475b] rounded-lg py-3.5 pl-12 pr-4 text-sm placeholder:text-[#6f758b80] focus:outline-none focus:ring-2 focus:ring-[#a3a6ff33] focus:border-[#a3a6ff]"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between px-1">
                <label className="text-xs uppercase tracking-widest text-[#6f758b]">
                  Password
                </label>
        
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                  lock
                </span>
                <input
                  {...register("password", { required: "Password is required" })}
                  type={passwordToggle ? "text" : "password"}
                  placeholder="••••••••••••"
                  className="w-full bg-[#1c253e] border border-[#41475b] rounded-lg py-3.5 pl-12 pr-12 text-sm placeholder:text-[#6f758b80] focus:outline-none focus:ring-2 focus:ring-[#a3a6ff33] focus:border-[#a3a6ff]"
                />
                <span
                  onClick={() => setPasswordToggle((prev) => !prev)}
                  className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#6f758b] cursor-pointer"
                >
                  {passwordToggle ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>

            {/* Error Box */}
            {error && (
              <div className="flex gap-3 p-3 rounded-lg border border-[#a70138]/20 bg-[#a70138]/10">
                <span className="material-symbols-outlined text-[#ff6e84] flex-shrink-0">
                  error
                </span>
                <div className="text-xs">
                  <p className="font-medium mb-1">{error}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#a3a6ff] to-[#c180ff] text-black shadow-lg shadow-[#a3a6ff33] hover:shadow-[#a3a6ff66] active:scale-[0.98] transition cursor-pointer"
            >
              Sign In to Workspace
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="border-t border-[#41475b]/30" />
            <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-[#1c253e] px-4 text-xs text-[#6f758b]">
              OR
            </span>
          </div>

  

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-[#a5aac2]">
            Don't have an account?
            <Link
              to="/auth/register"
              className="ml-1 text-[#a3a6ff] font-bold hover:text-[#c180ff] cursor-pointer"
            >
              Sign up
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;