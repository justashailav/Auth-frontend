import Signup from './components/Signup'
import FollowText from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import VerifyOTP from './components/OTP'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import AdminLayout from './Pages/Admin/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FollowText/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otp-verification/:email" element={<VerifyOTP/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/password/reset/:token" element={<ResetPassword/>}/>
      </Routes> 
      <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>     
    </>
    
  )
}

export default App
