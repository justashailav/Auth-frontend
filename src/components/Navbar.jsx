import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020617] border-b border-white/10">
      <div className="w-full px-4 sm:px-6">
        <div className="flex h-16 items-center max-w-6xl mx-auto justify-between">
        
          <Link to="/">
            <div className="text-white font-bold text-xl">
              Auth<span className="text-indigo-400">UI</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/cart" className="relative">
              <span className="text-gray-300 hover:text-white transition text-xl">
                🛒
              </span>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <Link to="/login">
              <button className="text-gray-300 hover:text-white transition">
                Login
              </button>
            </Link>
          </div>

          {/* MOBILE */}
          <button
            className="md:hidden text-gray-300 text-xl flex items-center gap-4"
            onClick={() => setOpen(!open)}
          >
            {/* MOBILE CART */}
            <Link
              to="/cart"
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <span className="text-xl">🛒</span>

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#020617] border-t border-white/10 px-4 pb-4">
          <div className="flex flex-col gap-4 pt-4">
            <Link to="/login" onClick={() => setOpen(false)}>
              <button className="text-gray-300 text-left">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
