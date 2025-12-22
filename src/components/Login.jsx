import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, isAuthencated, message, error } = useSelector(
    (state) => state.auth
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        dispatch(resetAuthSlice());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, message, dispatch]);
  if (isAuthencated) {
    return <Navigate to="/" />;
  }

  return (
    <section
      className="min-h-screen pt-16 flex items-center justify-center
      bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] px-4"
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mt-2 mb-6 text-sm sm:text-base">
          Login to your account
        </p>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 rounded-lg bg-[#020617]/70 border border-gray-700 text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-3 pr-12 rounded-lg bg-[#020617]/70 border border-gray-700 text-white placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-indigo-400 transition"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <p className="text-right text-sm mt-2">
              <Link
                to="/forgot-password"
                className="text-indigo-400 hover:underline"
              >
                Forgot password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              } text-white`}
          >
            {loading ? "Logging...." : "Login"}
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
