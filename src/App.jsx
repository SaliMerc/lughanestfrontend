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

import PrivateRoutes from './PrivateRoutes';

import DashboardNavigation from './user-dashboard/DashboardHeader';
import DashboardHome from './user-dashboard/DashboardHome';
import DashboardLogout from './user-dashboard/DashboardLogout';

import DashboardCourses from './user-dashboard/DashboardCourses';
import DashboardCompletedCourses from './user-dashboard/DashboardCompletedCourses';
import DashboardOngoingCourses from './user-dashboard/DashboardOngoingCourses';

import EnrollCourses from './user-dashboard/EnrollCourse';

import CourseModules from './user-dashboard/CourseModules';
import CourseLessons from './user-dashboard/CourseLessons';

import DashboardChats from './user-dashboard/DashboardChats';
import ChatInterface from './user-dashboard/ChatMessageInterface';

import DashboardSetting from './user-dashboard/DasboardSetting';
import SettingsChangePassword from './user-dashboard/SettingsChangePassword';
import SettingsDeleteAccount from './user-dashboard/SettingsDeleteAccount';

import DashboardBlogs from './user-dashboard/DashboardBlogs';
import DashboardBlogContent from './user-dashboard/DashboardBlogContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<DashboardNavigation />} />
          <Route path="/dashboard-home" element={<DashboardHome />} />
          <Route path="/logout" element={<DashboardLogout />} />

          <Route path="/dashboard-courses" element={<DashboardCourses />} />
          <Route path="/completed-courses" element={<DashboardCompletedCourses />} />
          <Route path="/ongoing-courses" element={<DashboardOngoingCourses />} />
          <Route path="/dashboard-courses/:slug" element={<EnrollCourses />} />

          <Route path="/dashboard-home/:slug" element={<CourseModules />} />
          <Route path="/dashboard-courses/course-lessons" element={<CourseLessons />} />

          <Route path="/dashboard-chats" element={<DashboardChats />} />
          <Route path="/dashboard-chats/chat-interface" element={<ChatInterface />} />


          <Route path="/dashboard-settings" element={<DashboardSetting />} />
          <Route path="/settings-change-password" element={<SettingsChangePassword />} />
          <Route path="/settings-delete-account" element={<SettingsDeleteAccount />} />

          <Route path="/dashboard-blog" element={<DashboardBlogs />} />
          <Route path="/dashboard-blog/:slug" element={<DashboardBlogContent />} />
        </Route>

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
