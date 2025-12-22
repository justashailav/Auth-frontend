import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { Navigate, useParams } from "react-router-dom";

const VerifyOTP = () => {
  const dispatch = useDispatch();
    const { email } = useParams();
   const { loading, error, message, isAuthencated } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerification( email, otp ));
  };

  useEffect(() => {
    if (message) {
      console.log(message);
    }
    if (error) {
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthencated, error, loading]);
  if (isAuthencated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617] px-4 pt-16">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">
          Verify OTP
        </h2>

        <p className="text-gray-400 text-center mt-2 mb-6 text-sm sm:text-base">
          Enter the OTP sent to your email
        </p>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        {message && (
          <p className="text-green-400 text-sm text-center mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#020617]/70 border border-gray-700 text-white tracking-widest text-center text-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              } text-white`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
