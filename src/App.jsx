
import Signup from './components/Signup'
import FollowText from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import VerifyOTP from './components/OTP'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

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
    </>
    
  )
}

export default App
