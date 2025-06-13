import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './landing-page-and-auth/Home';

import Courses from './landing-page-and-auth/Courses';

import Signup from './landing-page-and-auth/Signup';
import SignupVerification from './landing-page-and-auth/SignupOtpVerification';
import InvalidLinkResend from './landing-page-and-auth/InvalidLinkResendLink';

import Login from './landing-page-and-auth/Login';

import ForgottenPassword from './landing-page-and-auth/ForgottenPassword';
import ChangePasswordReset from './landing-page-and-auth/ChangePassword';

import InvalidLink from './landing-page-and-auth/InvalidLink';

import TermsAndConditions from './landing-page-and-auth/TermsAndConditions';
import PrivacyPolicy from './landing-page-and-auth/PrivacyPolicy';

import Blogs from './landing-page-and-auth/Blogs';
import BlogContent from './landing-page-and-auth/BlogContent';

import DashboardNavigation from './user-dashboard/DashboardHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardNavigation />} />

        <Route path="/" element={<Home />} />

        <Route path="/courses" element={<Courses />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogContent />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/account-verification" element={<SignupVerification />} />
        <Route path="/resend-activation-link" element={<InvalidLinkResend />} />

        <Route path="/login" element={<Login />} />

        <Route path="/invalid-link" element={<InvalidLink />} />

        <Route path="/password-reset" element={<ForgottenPassword />} />
        <Route path="/change-password" element={<ChangePasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
