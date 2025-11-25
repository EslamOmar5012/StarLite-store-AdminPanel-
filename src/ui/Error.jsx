import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div className="flex flex-col justify-center items-center gap-6 bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 h-screen text-white">
      <h1 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 font-bold text-transparent text-2xl">
        {error.status}
      </h1>
      <h3 className="bg-clip-text bg-linear-to-r from-blue-300 via-cyan-300 to-blue-400 font-bold text-transparent text-xl">
        {error.data.split(" ").slice(1).join(" ")}
      </h3>
    </div>
  );
}

export default Error;
