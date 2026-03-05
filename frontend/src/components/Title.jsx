import { Link } from "react-router-dom";

const Title = () => {
  return (
    <h1 className="select-none tracking-tight">
      <Link to="/Actuality" className="flex items-center gap-0.5 group">
        <span className="text-slate-800 font-extrabold text-2xl transition-colors group-hover:text-blue-600">
          Connect
        </span>
        <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-md text-xl font-bold transition-transform group-hover:scale-105">
          in
        </span>
      </Link>
    </h1>
  );
};

export default Title;
