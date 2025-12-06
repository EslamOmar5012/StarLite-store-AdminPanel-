import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Users, Menu, X, LogOut, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../features/logIn/loginSlice";

export default function AdminPanel() {
  const { status, user } = useSelector((store) => store.login);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleLogout = () => {
    console.log("Eslam");
    dispatch(adminLogout());
  };

  const isAtRoot = location.pathname === `/admin/${user?.username}`;

  return (
    <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen text-white">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden z-30 fixed inset-0 bg-black/50 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-72 lg:w-20 lg:hover:w-72 bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-blue-500/20 shadow-2xl transition-all duration-300 z-40 group ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-between items-center px-6 border-blue-500/20 border-b h-20">
          <h1 className="bg-clip-text bg-linear-to-r from-blue-400 via-blue-300 to-cyan-400 opacity-100 lg:group-hover:opacity-100 lg:opacity-0 font-bold text-transparent text-2xl transition-opacity duration-300">
            Dashboard
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-blue-500/20 p-2 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <Link
            to="users"
            className="flex justify-center lg:justify-start items-center gap-4 bg-linear-to-r from-blue-600 to-blue-700 shadow-blue-500/30 shadow-lg hover:shadow-blue-500/50 px-5 py-4 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer"
          >
            <Users size={24} className="shrink-0" />
            <span className="opacity-100 lg:group-hover:opacity-100 lg:opacity-0 min-h-0 font-semibold text-base whitespace-nowrap transition-opacity duration-300">
              Users
            </span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-20 min-h-screen">
        {/* Header */}
        <header className="top-0 z-20 sticky flex justify-between items-center bg-linear-to-r from-slate-800/80 via-blue-900/60 to-slate-800/80 shadow-lg backdrop-blur-xl px-5 md:px-8 border-blue-500/20 border-b h-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden hover:bg-blue-500/20 p-2.5 rounded-xl transition-all"
            >
              <Menu size={24} />
            </button>
            <button
              onClick={() => navigate(-1)}
              disabled={isAtRoot}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 ${
                isAtRoot
                  ? "bg-slate-700/50 text-slate-500 cursor-not-allowed opacity-50"
                  : "bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <h2 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 font-bold text-transparent text-2xl md:text-3xl">
              Dashboard
            </h2>
          </div>
          <button
            disabled={status === "loading"}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-linear-to-r from-red-600 hover:from-red-700 to-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/50 px-4 md:px-5 py-2.5 md:py-3 rounded-xl font-semibold text-sm md:text-base hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            {status === "loading" ? (
              <>
                <div className="border-2 border-white/30 border-t-white rounded-full w-5 h-5 animate-spin"></div>
                <span>Loading</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 md:w-5 h-4 md:h-5" />
                <span className="hidden sm:inline">Logout</span>
              </>
            )}
          </button>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          {isAtRoot ? (
            <div className="flex flex-col justify-center items-center min-h-[calc(100vh-12rem)]">
              <div className="bg-linear-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-sm p-8 md:p-12 border border-blue-500/20 rounded-3xl max-w-2xl text-center">
                <h1 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 mb-4 font-bold text-transparent text-4xl md:text-5xl">
                  Welcome Back!
                </h1>
                <p className="mb-8 text-slate-300 text-lg md:text-xl">
                  Select a tab from the sidebar to get started
                </p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
}
