import { useState } from "react";
import {
  Users,
  Menu,
  X,
  ChevronRight,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Shield,
} from "lucide-react";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Eslam Omar",
      email: "alice@example.com",
      phone: "+1 234 567 8900",
      joinDate: "2024-01-15",
      role: "Admin",
      avatar: "👩‍💼",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      phone: "+1 234 567 8901",
      joinDate: "2024-02-20",
      role: "User",
      avatar: "👨‍💼",
    },
    {
      id: 3,
      name: "Carol White",
      email: "carol@example.com",
      phone: "+1 234 567 8902",
      joinDate: "2024-03-10",
      role: "Moderator",
      avatar: "👩‍🦰",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@example.com",
      phone: "+1 234 567 8903",
      joinDate: "2024-04-05",
      role: "User",
      avatar: "👨‍🦱",
    },
    {
      id: 5,
      name: "Eve Davis",
      email: "eve@example.com",
      phone: "+1 234 567 8904",
      joinDate: "2024-05-12",
      role: "User",
      avatar: "👩",
    },
  ]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setSelectedUser(null);
  };

  return (
    <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen text-white">
      {/* User Details Modal */}
      {selectedUser && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/70 backdrop-blur-sm p-3 md:p-4 animate-in duration-300 fade-in"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-linear-to-br from-slate-800 via-slate-900 to-slate-800 shadow-2xl border border-blue-500/30 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto animate-in duration-300 zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="top-0 z-500 sticky flex justify-between items-center bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 backdrop-blur-xl px-5 md:px-8 py-4 md:py-5 border-blue-400/30 border-b rounded-t-3xl">
              <h3 className="flex items-center gap-3 font-bold text-xl md:text-2xl">
                <Users className="w-6 md:w-7 h-6 md:h-7" />
                User Details
              </h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="hover:bg-white/20 p-2 rounded-xl hover:rotate-90 transition-all duration-300"
              >
                <X className="w-5 md:w-6 h-5 md:h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-5 md:space-y-6 p-5 md:p-8">
              {/* User Header */}
              <div className="flex sm:flex-row flex-col items-start sm:items-center gap-5">
                <div className="text-6xl md:text-7xl">
                  {selectedUser.avatar}
                </div>
                <div className="flex-1">
                  <h1 className="mb-3 font-bold text-white text-3xl md:text-4xl">
                    {selectedUser.name}
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

                {/* Phone */}
                <div className="bg-linear-to-br from-green-500/10 to-green-600/5 hover:shadow-green-500/20 hover:shadow-lg backdrop-blur-xl p-5 md:p-6 border border-green-400/30 hover:border-green-400/60 rounded-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-500/30 p-2.5 rounded-xl">
                      <Phone className="w-5 h-5 text-green-300" />
                    </div>
                    <span className="font-semibold text-green-300 text-base md:text-lg">
                      Phone Number
                    </span>
                  </div>
                  <p className="pl-0 sm:pl-12 text-white/90 text-base md:text-lg">
                    {selectedUser.phone}
                  </p>
                </div>

                {/* Join Date */}
                <div className="bg-linear-to-br from-purple-500/10 to-purple-600/5 hover:shadow-lg hover:shadow-purple-500/20 backdrop-blur-xl p-5 md:p-6 border border-purple-400/30 hover:border-purple-400/60 rounded-2xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-purple-500/30 p-2.5 rounded-xl">
                      <Calendar className="w-5 h-5 text-purple-300" />
                    </div>
                    <span className="font-semibold text-purple-300 text-base md:text-lg">
                      Member Since
                    </span>
                  </div>
                  <p className="pl-0 sm:pl-12 text-white/90 text-base md:text-lg">
                    {new Date(selectedUser.joinDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
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
                <button
                  onClick={() => handleDeleteUser(selectedUser.id)}
                  className="flex justify-center items-center gap-2 bg-linear-to-r from-red-600 hover:from-red-700 to-red-700 hover:to-red-800 hover:shadow-red-600/50 hover:shadow-xl px-5 py-3 md:py-4 rounded-xl w-full font-bold text-sm md:text-base hover:scale-[1.02] active:scale-95 transition-all duration-300"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete User Permanently
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden z-30 fixed inset-0 bg-black/50 cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-linear-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-blue-500/20 transition-all duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-72 lg:w-20 lg:hover:w-72 group shadow-2xl`}
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
          <button className="flex justify-center lg:justify-start items-center gap-4 bg-linear-to-r from-blue-600 to-blue-700 shadow-blue-500/30 shadow-lg hover:shadow-blue-500/50 px-5 py-4 rounded-2xl w-full overflow-hidden transition-all duration-300 cursor-pointer">
            <Users size={24} className="shrink-0" />
            <span className="opacity-100 lg:group-hover:opacity-100 lg:opacity-0 min-h-0 font-semibold text-base whitespace-nowrap transition-opacity duration-300">
              Users
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-20 min-h-screen">
        {/* Header */}
        <header className="top-0 z-20 sticky flex items-center bg-linear-to-r from-slate-800/80 via-blue-900/60 to-slate-800/80 shadow-lg backdrop-blur-xl px-5 md:px-8 border-blue-500/20 border-b h-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden hover:bg-blue-500/20 mr-4 p-2.5 rounded-xl transition-all"
          >
            <Menu size={24} />
          </button>
          <h2 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 font-bold text-transparent text-2xl md:text-3xl">
            Dashboard
          </h2>
        </header>

        {/* Content Area */}
        <div className="p-4 md:p-8">
          <div className="mx-auto max-w-6xl">
            {/* Users List Card */}
            <div className="bg-linear-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 shadow-2xl backdrop-blur-xl border border-blue-500/30 rounded-3xl overflow-hidden">
              <div className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 px-6 md:px-8 py-5 md:py-6 border-blue-400/30 border-b">
                <h3 className="flex items-center gap-3 mb-2 font-bold text-xl md:text-2xl">
                  <Users className="w-7 h-7" />
                  Users Management
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  Click on any user to view their details
                </p>
              </div>

              <div className="divide-y divide-blue-400/10">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className="group flex items-center gap-4 md:gap-6 hover:bg-blue-500/10 px-5 md:px-8 py-5 md:py-6 w-full text-left transition-all duration-300"
                  >
                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {user.avatar}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white group-hover:text-blue-300 text-lg md:text-xl truncate transition-colors">
                        {user.name}
                      </p>
                      <p className="mt-1 text-blue-200/80 text-sm md:text-base truncate">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Shield className="w-3.5 md:w-4 h-3.5 md:h-4 text-yellow-400" />
                        <span className="font-semibold text-yellow-300 text-xs md:text-sm">
                          {user.role}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="opacity-0 group-hover:opacity-100 w-6 md:w-7 h-6 md:h-7 text-blue-400 transition-all group-hover:translate-x-1 duration-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
