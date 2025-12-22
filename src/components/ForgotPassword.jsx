import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { loading, message, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword( email ));
  };

  useEffect(() => {
    if (message || error) {
      setTimeout(() => dispatch(resetAuthSlice()), 3000);
    }
  }, [message, error, dispatch]);

  return (
    <section className="min-h-screen pt-16 flex items-center justify-center
      bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] px-4">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl
        border border-white/10 rounded-2xl p-6 shadow-2xl">

        <h2 className="text-2xl font-bold text-white text-center">
          Forgot Password
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-6 text-sm">
          Enter your email to reset your password
        </p>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        {message && (
          <p className="text-green-400 text-sm text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#020617]/70
            border border-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90"
              } text-white`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
