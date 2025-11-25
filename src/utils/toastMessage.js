import { toast } from "react-toastify";

const toastConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className:
    "!bg-slate-800/90 !border !border-blue-500/30 !rounded-xl !backdrop-blur-xl",
  progressClassName: "!bg-gradient-to-r from-blue-600 to-blue-700",
  bodyClassName: "!text-white !font-medium !text-sm",
};

export const showToast = (message, type = "info") => {
  switch (type) {
    case "success":
      toast.success(message, {
        ...toastConfig,
        className:
          "!bg-gradient-to-br from-emerald-900/90 to-slate-800/90 !border !border-emerald-500/30 !rounded-xl !backdrop-blur-xl",
        progressClassName: "!bg-gradient-to-r from-emerald-500 to-emerald-600",
        icon: "✓",
      });
      break;
    case "error":
      toast.error(message, {
        ...toastConfig,
        className:
          "!bg-gradient-to-br from-rose-900/90 to-slate-800/90 !border !border-rose-500/30 !rounded-xl !backdrop-blur-xl",
        progressClassName: "!bg-gradient-to-r from-rose-500 to-rose-600",
        icon: "✕",
      });
      break;
    case "warning":
      toast.warning(message, {
        ...toastConfig,
        className:
          "!bg-gradient-to-br from-amber-900/90 to-slate-800/90 !border !border-amber-500/30 !rounded-xl !backdrop-blur-xl",
        progressClassName: "!bg-gradient-to-r from-amber-500 to-amber-600",
        icon: "⚠",
      });
      break;
    default:
      toast.info(message, {
        ...toastConfig,
        className:
          "!bg-gradient-to-br from-blue-900/90 to-slate-800/90 !border !border-blue-500/30 !rounded-xl !backdrop-blur-xl",
        progressClassName: "!bg-gradient-to-r from-blue-600 to-blue-700",
        icon: "ℹ",
      });
  }
};
