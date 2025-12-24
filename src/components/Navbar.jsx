import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617] border-b border-white/10">
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 items-center max-w-6xl mx-auto justify-between">
          <Link to="/">
            <div className="text-white font-bold text-xl">
              Auth<span className="text-indigo-400">UI</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <button className="text-gray-300 hover:text-white transition">
                Login
              </button>
            </Link>
          </div>
          <button
            className="md:hidden text-gray-300 text-xl"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-[#020617] border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            <Link to="/login">
              <button className="text-gray-300 text-left">Login</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
