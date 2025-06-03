import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Home from './landing-page-and-auth/home';

import Signup from './landing-page-and-auth/Signup';
import SignUpOTPVerification from './landing-page-and-auth/SignupOtpVerification';

import Login from './landing-page-and-auth/Login';

import ForgottenPassword from './landing-page-and-auth/ForgottenPassword';
import ChangePasswordReset from './landing-page-and-auth/ChangePassword';

import TermsAndConditions from './landing-page-and-auth/TermsAndConditions';
import PrivacyPolicy from './landing-page-and-auth/PrivacyPolicy';

import Blogs from './landing-page-and-auth/blogs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/signup" element={<Signup />}/>
        <Route path="/signup-otp-verification" element={<SignUpOTPVerification />}/>

        <Route path="/login" element={<Login />}/>

         <Route path="/password-reset" element={<ForgottenPassword />}/>
        <Route path="/change-password" element={<ChangePasswordReset />}/>

        <Route path="/terms-and-conditions" element={<TermsAndConditions />}/>
         <Route path="/privacy-policy" element={<PrivacyPolicy />}/>

        <Route path="/blogs" element={<Blogs />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
