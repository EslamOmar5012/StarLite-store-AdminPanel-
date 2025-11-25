import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, Shield, Star } from "lucide-react";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { adminLogIn } from "./loginSlice";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const status = useSelector((store) => store.login.status);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(adminLogIn(data));
  };

  return (
    <div
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className="flex justify-center items-center bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 p-4 overflow-auto"
    >
      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Logo/Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-linear-to-br from-blue-500 to-blue-700 shadow-blue-500/50 shadow-lg mb-4 rounded-2xl w-20 h-20">
            <Star className="w-10 h-10 text-white" />
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 mb-2 font-bold text-transparent text-4xl">
            Welcome Back
          </h1>
          <p className="text-blue-200/70">Sign in to access your dashboard</p>
        </div>

        {/*Login Form*/}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-linear-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 shadow-2xl backdrop-blur-xl p-8 border border-blue-500/30 rounded-3xl"
        >
          <div className="space-y-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="usernameoremail"
                  className="block mb-2 font-semibold text-blue-300 text-sm"
                >
                  Email / Username
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <input
                    {...register("usernameoremail", {
                      required: "Please enter Email or userName",
                      pattern: {
                        value:
                          /^(?:[a-zA-Z](?!.*[_.]{2})[a-zA-Z0-9._]{2,19}|[^\s@]+@[^\s@]+\.[^\s@]{2,})$/,
                        message: "Enter a valid username or email address",
                      },
                    })}
                    id="usernameoremail"
                    type="text"
                    required
                    className="bg-slate-900/50 py-3 pr-4 pl-12 border border-blue-500/30 focus:border-blue-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-white transition-all duration-300 placeholder-blue-300/50"
                    placeholder="admin@example.com / username"
                  />
                </div>
              </div>
              {errors.usernameoremail && (
                <span className="bg-rose-200 p-0.5 rounded-lg text-red-500 text-center">
                  {errors.usernameoremail?.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 font-semibold text-blue-300 text-sm"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="w-5 h-5 text-blue-400" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Please enter password",
                    })}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-slate-900/50 py-3 pr-12 pl-12 border border-blue-500/30 focus:border-blue-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-white transition-all duration-300 placeholder-blue-300/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="right-0 absolute inset-y-0 flex items-center pr-4 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {errors.password && (
                <span className="bg-rose-200 p-0.5 rounded-lg text-red-500 text-center">
                  {errors.password?.message}
                </span>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center text-sm">
              <Link
                to="/forgotPassword"
                className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              disabled={status === "loading"}
              className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-600 hover:from-blue-700 to-blue-700 hover:to-blue-800 disabled:opacity-50 shadow-blue-500/30 shadow-lg hover:shadow-blue-500/50 py-4 rounded-xl w-full font-bold text-white hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 transition-all duration-300 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
