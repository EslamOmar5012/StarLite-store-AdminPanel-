import { lazy, Suspense, useEffect } from "react";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { store } from "./Services/store";
import { ToastContainer } from "react-toastify";
const Loader = lazy(() => import("./ui/loader"));
const ProtectedAuth = lazy(() => import("./ui/ProtectedAuth"));
const Login = lazy(() => import("./features/logIn/Login"));
const AdminPanel = lazy(() => import("./ui/AdminPanel"));
const Error = lazy(() => import("./ui/Error"));

const router = createBrowserRouter([]);

function App() {
  useEffect(() => {
    // Fix mobile browser bar issue by setting dynamic viewport height
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    window.addEventListener("orientationchange", setVH);

    // Make body and html background transparent
    document.documentElement.style.backgroundColor = "transparent";
    document.body.style.backgroundColor = "transparent";

    return () => {
      window.removeEventListener("resize", setVH);
      window.removeEventListener("orientationchange", setVH);
    };
  }, []);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  );
}

export default App;
