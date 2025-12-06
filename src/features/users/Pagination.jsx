import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPageNumbers = () => {
    const pages = [];

    if (isMobile) {
      // Mobile: Only show current page
      pages.push(currentPage);
    } else {
      // Desktop: show more pages
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);

        if (currentPage <= 3) {
          pages.push(2, 3, 4);
          pages.push("ellipsis-end");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 2) {
          pages.push("ellipsis-start");
          pages.push(
            totalPages - 3,
            totalPages - 2,
            totalPages - 1,
            totalPages
          );
        } else {
          pages.push("ellipsis-start");
          pages.push(currentPage - 1, currentPage, currentPage + 1);
          pages.push("ellipsis-end");
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 bg-linear-to-r from-slate-800/50 to-slate-900/50 px-6 py-5 border-blue-400/10 border-t">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-30 px-4 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 disabled:hover:scale-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        {!isMobile && "Previous"}
      </button>

      <div className="flex gap-2">
        {getPageNumbers().map((page, index) => {
          if (typeof page === "string") {
            // Render ellipsis
            return (
              <span
                key={`${page}-${index}`}
                className="px-4 py-2.5 text-blue-300 text-sm"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 cursor-pointer ${
                currentPage === page
                  ? "bg-linear-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/30"
                  : "bg-blue-600/30 hover:bg-blue-600/50"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 bg-blue-600/30 hover:bg-blue-600/50 disabled:opacity-30 px-4 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 disabled:hover:scale-100 transition-all duration-300 cursor-pointer disabled:cursor-not-allowed"
      >
        {!isMobile && "Next"}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Pagination;
