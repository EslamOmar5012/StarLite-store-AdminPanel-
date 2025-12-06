import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { getRandomAvatar } from "../../utils/helper";
import { AVATAR_EMOJIS } from "../../utils/config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "./usersSlice";
import { useNavigate } from "react-router-dom";

function UserDetailsModal({ selectedUser, setSelectedUser, setUpdateUsers }) {
  const [showPassword, setShowPassword] = useState(false);
  const deleting = useSelector((store) => store.users.deleting);
  const user = useSelector((store) => store.login.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(selectedUser);
    data = { userid: selectedUser._id, ...data };

    dispatch(deleteUser(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setSelectedUser(null);
        setUpdateUsers((prev) => !prev);
      }
    });

    reset();
  };

  return (
    <>
      {selectedUser && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm p-3 md:p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-linear-to-br from-slate-800 via-slate-900 to-slate-800 shadow-2xl border border-blue-500/30 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="top-0 z-10 sticky flex justify-between items-center bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 backdrop-blur-xl px-5 md:px-8 py-4 md:py-5 border-blue-400/30 border-b rounded-t-3xl">
              <h3 className="flex items-center gap-3 font-bold text-xl md:text-2xl">
                <Users className="w-6 md:w-7 h-6 md:h-7" />
                User Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="hover:bg-white/20 p-2 rounded-xl hover:rotate-90 transition-all duration-300 cursor-pointer"
              >
                <X className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 md:space-y-6 p-5 md:p-8">
              {/* User Header */}
              <div className="flex sm:flex-row flex-col items-start sm:items-center gap-5">
                <div className="text-6xl md:text-7xl">
                  {getRandomAvatar(AVATAR_EMOJIS)}
                </div>
                <div className="flex-1">
                  <h1 className="mb-3 font-bold text-white text-3xl md:text-4xl">
                    {selectedUser.username}
                  </h1>
                  <div className="inline-flex items-center gap-2 bg-linear-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm px-4 py-2 border border-yellow-400/40 rounded-xl">
                    <Shield className="w-4 md:w-5 h-4 md:h-5 text-yellow-300" />
                    <span className="font-semibold text-yellow-200 text-sm md:text-base">
                      {selectedUser.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="bg-linear-to-br from-blue-500/10 to-blue-600/5 hover:shadow-blue-500/20 hover:shadow-lg backdrop-blur-xl p-5 md:p-6 border border-blue-400/30 hover:border-blue-400/60 rounded-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-500/30 p-2.5 rounded-xl">
                      <Mail className="w-5 h-5 text-blue-300" />
                    </div>
                    <span className="font-semibold text-blue-300 text-base md:text-lg">
                      Email Address
                    </span>
                  </div>
                  <p className="pl-0 sm:pl-12 text-white/90 text-base md:text-lg break-all">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              {/* Delete Section */}
              <div className="bg-linear-to-br from-red-600/20 to-red-700/10 backdrop-blur-xl mt-6 p-5 md:p-6 border border-red-500/50 rounded-2xl">
                <div className="flex items-start gap-3 mb-4">
                  <Trash2 className="mt-1 w-5 h-5 text-red-400 shrink-0" />
                  <div>
                    <h4 className="mb-2 font-bold text-red-300 text-lg">
                      Danger Zone
                    </h4>
                    <p className="text-red-200/90 text-sm md:text-base">
                      Permanently delete this user and all associated data? This
                      action cannot be undone.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                          className="bg-slate-900/50 mb-2 py-3 pr-12 pl-12 border border-blue-500/30 focus:border-blue-400/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full text-white transition-all duration-300 placeholder-blue-300/50"
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
                  <button
                    disabled={deleting === "loading"}
                    className="flex justify-center items-center gap-2 bg-linear-to-r from-red-600 hover:from-red-700 to-red-700 hover:to-red-800 hover:shadow-red-600/50 hover:shadow-xl px-5 py-3 md:py-4 rounded-xl w-full font-bold text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    {deleting === "loading" ? (
                      <>
                        <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></div>
                        <span>Deleting</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        Delete User Permanently
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetailsModal;
