import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
const Signup = () => {
  const dispatch = useDispatch();

  const navigateTo = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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
    dispatch(register(formData));
  };
  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verification/${formData.email}`);
    }
  }, [message, navigateTo, formData.email]);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] px-3 sm:px-4 mt-10">
      <div className="w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Create Account
        </h2>
        <p className="text-gray-400 text-center mt-2 mb-6 sm:mb-8 text-sm sm:text-base">
          Join us and explore new possibilities
        </p>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label className="block text-xs sm:text-sm text-gray-400 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 rounded-lg bg-[#020617]/70 border border-gray-700 text-white placeholder-gray-500
              focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm sm:text-base"
            />
          </div>
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
              focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm sm:text-base"
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
                focus:outline-none focus:ring-2 focus:ring-purple-500 transition text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-purple-400 transition"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3l18 18"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-gray-400 text-xs sm:text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-purple-400 cursor-pointer hover:underline">
            Login
          </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
