import { ChevronRight, Shield, Users } from "lucide-react";
import UserDetailsModal from "./UserDetailsModal";
import { useEffect, useState } from "react";
import { getRandomAvatar } from "../../utils/helper";
import { AVATAR_EMOJIS } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./usersSlice";
import Pagination from "./Pagination";

function Usertab() {
  const [selectedUser, setSelectedUser] = useState(null);

  const [updateUsers, setUpdateUsers] = useState(false);

  const { users, currentPage, totalPages, totalUsers, status, error } =
    useSelector((store) => store.users);

  console.log(currentPage);

  const dispatch = useDispatch();

  const handlePageChange = (number) => {
    dispatch(getUsers({ pageNum: number }));
  };

  useEffect(() => {
    dispatch(getUsers({ pageNum: 1 }));
  }, [dispatch, updateUsers]);

  return (
    <>
      {/* User Details Modal */}
      <UserDetailsModal
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setUpdateUsers={setUpdateUsers}
        key={selectedUser}
      />
      {status === "loading" ? (
        <>
          <div className="mx-auto border-2 border-white/30 border-t-white rounded-full w-15 h-15 animate-spin"></div>
        </>
      ) : (
        <div className="mx-auto max-w-6xl">
          {error.length === 0 ? (
            <div className="bg-linear-to-br from-slate-800/50 via-blue-900/30 to-slate-800/50 shadow-2xl backdrop-blur-xl border border-blue-500/30 rounded-3xl overflow-hidden">
              <div className="bg-linear-to-r from-blue-600 via-blue-700 to-blue-600 px-6 md:px-8 py-5 md:py-6 border-blue-400/30 border-b">
                <h3 className="flex items-center gap-3 mb-2 font-bold text-xl md:text-2xl">
                  <Users className="w-7 h-7" />
                  Users Management
                </h3>
                <p className="text-blue-100 text-sm md:text-base">
                  Totalnumber Of Users: {totalUsers}
                </p>
              </div>

              <div className="divide-y divide-blue-400/10">
                {users.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => setSelectedUser(user)}
                    className="group flex items-center gap-4 md:gap-6 hover:bg-blue-500/10 px-5 md:px-8 py-5 md:py-6 w-full text-left transition-all duration-300 cursor-pointerc"
                  >
                    <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform duration-300">
                      {getRandomAvatar(AVATAR_EMOJIS)}
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
                    {error.length === 0 ? (
                      ""
                    ) : (
                      <Loader2 className="opacity-0 group-hover:opacity-100 w-6 md:w-7 h-6 md:h-7 text-blue-400 transition-all group-hover:translate-x-1 duration-300" />
                    )}
                    <ChevronRight className="opacity-0 group-hover:opacity-100 w-6 md:w-7 h-6 md:h-7 text-blue-400 transition-all group-hover:translate-x-1 duration-300" />
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          ) : (
            <h2 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 p-5 border-5 border-blue-400 font-bold text-transparent text-xl sm:text-4xl text-center text">
              {error}
            </h2>
          )}
        </div>
      )}
    </>
  );
}

export default Usertab;
