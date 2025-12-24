import { Routes, Route, useLocation } from "react-router-dom";

import Signup from "./components/Signup";
import FollowText from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import VerifyOTP from "./components/OTP";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import AdminLayout from "./Pages/Admin/AdminLayout";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { Product } from "../../backend/models/productModel";

function App() {
  const location = useLocation();

  // 👇 Hide Navbar on admin routes
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* 🌐 Public Routes */}
        <Route path="/" element={<FollowText />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp-verification/:email" element={<VerifyOTP />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<Product />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
