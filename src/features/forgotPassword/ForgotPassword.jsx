import {
  FileLock,
  KeyRound,
  Lock,
  LogIn,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  forgotPasswordAdmin,
  forgotPasswordAdmin_SEND_OTP,
} from "../logIn/loginSlice";

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [otpSend, setOtpSend] = useState(false);

  const { user, status } = useSelector((store) => store.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (otpSend) {
      dispatch(forgotPasswordAdmin(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          navigate("/login");
        }
      });
    } else {
      dispatch(forgotPasswordAdmin_SEND_OTP(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setOtpSend(true);
        }
      });
    }
  };

  if (user) return <Navigate to={`/admin/${user.username}`} replace />;

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
            <FileLock className="w-10 h-10 text-white" />
          </div>
          <h1 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 mb-2 font-bold text-transparent text-4xl">
            Forgot password
          </h1>
          <p className="text-blue-200/70">you can recreate your password</p>
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
                  htmlFor="email"
                  className="block mb-2 font-semibold text-blue-300 text-sm"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Please enter Email",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    id="email"
                    type="email"
                    required
                    className="bg-slate-900/50 py-3 pr-4 pl-12 border border-blue-500/30 focus:border-blue-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-white transition-all duration-300 placeholder-blue-300/50"
                    placeholder="admin@example.comz"
                  />
                </div>
              </div>
              {errors.email && (
                <span className="bg-rose-200 p-0.5 rounded-lg text-red-500 text-center">
                  {errors.email?.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            {otpSend ? (
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
                      {...register("newPassword", {
                        required: "Please enter password",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                          message:
                            "Password must be 8–20 chars, include upper & lower case letters, a number, and a special symbol",
                        },
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

                {errors.newPassword && (
                  <span className="bg-rose-200 p-0.5 rounded-lg text-red-500 text-center">
                    {errors.newPassword?.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {/* OTP Code */}
            {otpSend ? (
              <div className="flex flex-col gap-2">
                <div>
                  <label
                    htmlFor="otp"
                    className="block mb-2 font-semibold text-blue-300 text-sm"
                  >
                    OTP
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                      <Lock className="w-5 h-5 text-blue-400" />
                    </div>
                    <input
                      {...register("otp", {
                        required: "Please enter your 6 digit otp",
                        pattern: {
                          value: /^\d{6}$/,
                          message: "OTP must be exactly 6 digits",
                        },
                      })}
                      id="otp"
                      type="text"
                      required
                      className="bg-slate-900/50 py-3 pr-12 pl-12 border border-blue-500/30 focus:border-blue-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-white transition-all duration-300 placeholder-blue-300/50"
                      placeholder="123456"
                    />
                  </div>
                </div>

                {errors.otp && (
                  <span className="bg-rose-200 p-0.5 rounded-lg text-red-500 text-center">
                    {errors.otp?.message}
                  </span>
                )}
              </div>
            ) : (
              ""
            )}

            {/* Submit Button */}
            <button
              disabled={status === "loading"}
              className="flex justify-center items-center gap-2 bg-linear-to-r from-blue-600 hover:from-blue-700 to-blue-700 hover:to-blue-800 disabled:opacity-50 shadow-blue-500/30 shadow-lg hover:shadow-blue-500/50 py-4 rounded-xl w-full font-bold text-white hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></div>
                  <span>Loading</span>
                </>
              ) : otpSend ? (
                <>
                  <KeyRound className="w-5 h-5" />
                  <span>Change password</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>send OTP</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
