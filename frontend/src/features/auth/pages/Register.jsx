import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { handleRegister } = useAuth();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.authentication);

  const onSubmit = async (data) => {
    const res = await handleRegister(data);
    if (res.success) {
      toast.success("Verification email sent! Please check your inbox.");
      navigate("/auth/login");
    } else {
      toast.error(res.message);
    }
  };

  const onError = (errors) => {
    // Show first validation error as toast
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#070d1f] text-[#dfe4fe] overflow-hidden">
      {/* Noise */}
      <div className="fixed inset-0 opacity-[0.05] z-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=0 0 200 200 xmlns=http://www.w3.org/2000/svg%3E%3Cfilter id=noiseFilter%3E%3CfeTurbulence type=fractalNoise baseFrequency=0.65 numOctaves=3 stitchTiles=stitch/%3E%3C/filter%3E%3Crect width=100%25 height=100%25 filter=url(%23noiseFilter)/%3E%3C/svg%3E')]" />

      {/* Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a3a6ff] blur-[120px] opacity-40 rounded-full" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#c180ff] blur-[120px] opacity-40 rounded-full" />

      {/* Main */}
      <main className="relative z-10 w-full max-w-[540px] p-6">
        <div className="bg-[rgba(28,37,62,0.6)] backdrop-blur-[24px] border border-[#6f758b]/20 rounded-xl p-8 md:p-12 flex flex-col items-center">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-[#a3a6ff] to-[#c180ff] flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-3xl text-black">
                terminal
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tight mb-3">
              Create your account
            </h1>
            <p className="text-[#a5aac2]">
              Start coding collaboratively in real-time
            </p>
          </div>

          {/* Form */}
          <form
            className="w-full space-y-6"
            onSubmit={handleSubmit(onSubmit, onError)}
          >
            {/* Full Name / Username */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-[#6f758b] pl-1">
                Full Name
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                  person
                </span>
                <input
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    maxLength: { value: 20, message: "Maximum 20 characters" },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "No spaces or special characters allowed",
                    },
                  })}
                  type="text"
                  placeholder="Janus Architect"
                  className="w-full h-14 bg-[#1c253e] rounded-md pl-12 pr-4 text-sm placeholder:text-[#6f758b80] focus:ring-2 focus:ring-[#a3a6ff66] focus:bg-[#222b47] outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest uppercase text-[#6f758b] pl-1">
                Email Address
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                  alternate_email
                </span>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="dev@ethercode.io"
                  className="w-full h-14 bg-[#1c253e] rounded-md pl-12 pr-4 text-sm placeholder:text-[#6f758b80] focus:ring-2 focus:ring-[#a3a6ff66] focus:bg-[#222b47] outline-none"
                />
              </div>
            </div>

            {/* Password Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-[#6f758b] pl-1">
                  Password
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                    lock
                  </span>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                        message:
                          "Min 8 chars, uppercase, lowercase, number & special character",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-14 bg-[#1c253e] rounded-md pl-12 pr-4 text-sm placeholder:text-[#6f758b80] focus:ring-2 focus:ring-[#a3a6ff66] focus:bg-[#222b47] outline-none"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest uppercase text-[#6f758b] pl-1">
                  Confirm
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#6f758b] group-focus-within:text-[#a3a6ff]">
                    verified_user
                  </span>
                  <input
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-14 bg-[#1c253e] rounded-md pl-12 pr-4 text-sm placeholder:text-[#6f758b80] focus:ring-2 focus:ring-[#a3a6ff66] focus:bg-[#222b47] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-16 bg-gradient-to-r cursor-pointer from-[#a3a6ff] to-[#c180ff] rounded-xl text-black font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition shadow-lg shadow-[#a3a6ff33] mt-6"
            >
              <span>Create Account</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          {/* Footer */}
          <div className="mt-10 flex flex-col items-center gap-6 w-full">
            <p className="text-sm text-[#a5aac2]">
              Already have an account?
              <Link
                to="/auth/login"
                className="ml-1 text-[#a3a6ff] font-bold hover:text-[#c180ff] cursor-pointer"
              >
                Login
              </Link>
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 w-full opacity-50">
              <div className="h-[1px] bg-[#41475b] flex-grow" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#6f758b]">
                Architect Identity
              </span>
              <div className="h-[1px] bg-[#41475b] flex-grow" />
            </div>

            {/* Social */}
            <div className="flex gap-4">
              <button className="w-12 h-12 rounded-lg bg-[#11192e] flex items-center justify-center border border-[#41475b]/30 hover:bg-[#222b47]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6gxgHAcD0qzCXJlhJrMy9AwOlfMi8KpQKt3QFVSPy-UgPKsuK1Qo5v_zKRXB9-lo4mybyeZ6ChyI17qIQiEgWvgrOE4cd-MadTxTB3AQ2m6a-LFWDj1C18zkbeVGtGQIjLStPbsxx9qNqvarVqU9U7JCX3P-lV7kwC17rNPUARlfswVLRLf75V6AxzLfVhzV_QVUIKg5WEcH5bECP8k_EvADb8Rj-3lNoS4QiPbGjSGEtnwCpQT55Vnl0ELnnIJkkS6qxB-4zPbNK"
                  className="w-5 h-5"
                  alt="github"
                />
              </button>
              <button className="w-12 h-12 rounded-lg bg-[#11192e] flex items-center justify-center border border-[#41475b]/30 hover:bg-[#222b47]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcoBgH7iIQNfq9bUMrRJpqczQ9Xt-OZ1R5-j4u3JX9JXhqazh4fvHo1UjzPIBHnlQ9uKTVgsrvxj06Q7hKVId7jTTZOzgiTKMyX0R1DFj7ERt8rvU15rxhK32i0RsYeD9I6yx9wRhuBs8KL44LpVeJ46OOvhueO1xWcQleWzeu5llPB026sbuY08YqSxYkb4vJ89VuRUeyKbq_52VDzYWlFAuvlhh-c9BCWRGN8ah07-4n8qt1P67FQ8N6YancLM-CMinAwXUrEmhG"
                  className="w-5 h-5"
                  alt="google"
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Background Text */}
      <div className="fixed bottom-10 left-10 opacity-5 hidden lg:block">
        <h2 className="text-9xl font-black tracking-tight">ETHER</h2>
      </div>
      <div className="fixed top-10 right-10 opacity-5 hidden lg:block">
        <h2 className="text-9xl font-black tracking-tight">CODE</h2>
      </div>
    </div>
  );
};

export default RegisterPage;