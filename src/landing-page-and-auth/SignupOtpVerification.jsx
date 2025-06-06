import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { handlePasswordReset } from '../utils/authUtils';


function PasswordReset() {
  const [formData, setFormData] = useState({
    email: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = sessionStorage.getItem('otp-email');


  // Email verification logic starts here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email) {
      setFormError('Please enter your email to receive a reset link');
      return;
    };

    setFormError('');

    setLoading(true);

    await handlePasswordReset({
      otp: formData.email
    },
      (response) => {
        setLoading(false);
        if (response.data.message.includes("Your account has already been verified") ||
          response.data.message.includes("Your account was verified successfully")) {
          setFormSuccess(response.data.message)
          navigate('/login');
          sessionStorage.removeItem('otp-email')
        }
        else {
          setFormError(response.data.message)
        }
      },
      (error) => {
        setLoading(false);

        const errorData = error?.response?.data;

        if (errorData) {
          setFormError(errorData.message)

        } else {

          setFormError("Email Verification Failed.");
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-3/4 bg-gradient-to-br from-[#8F5932] to-[#8F5932] mt-28">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#E3E0C0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#FBEC6C] text-lg font-semibold animate-pulse">verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className='form-element' style={{
        backgroundImage: `url(${auth_background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

      }} >
        <div className="form-div">
          <div className='form-title'>
            <div className='heading-item'>OTP<span> Verification</span></div>
          </div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>OTP*</legend>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="6"
                placeholder='Enter the OTP'
                name='otp'
                value={formData.otp}
                onChange={handleChange}
                required />
            </fieldset>
            <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
              <h5>{formError}</h5>
            </div>
            <div className="form-header-items flex justify-between items-center my-0 mx-2 text-green-700">
              <h5>{formSuccess}</h5>
            </div>
            <div className='forgotten-pass-container'>
              <a href='' className='underlined-item forgotten-pass'>
                Resend Code..
              </a>
            </div>
            <button type='submit'>Verify Email <FontAwesomeIcon icon={faArrowRight} /></button>
          </form>
        </div>
      </section>
    </>
  );
}
export default PasswordReset;
