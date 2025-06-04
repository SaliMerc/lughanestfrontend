import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin } from '../utils/authUtils';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const Google_Client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-3/4 bg-gradient-to-br from-[#8F5932] to-[#8F5932]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#E3E0C0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#FBEC6C] text-lg font-semibold animate-pulse">Signing you up...</p>
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
            <div className='heading-item'>Create <span> Your </span>Acount</div>
          </div>
          <div className='login-with-google'>
            <GoogleOAuthProvider clientId={Google_Client_Id}>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setLoading(true)
                handleGoogleLogin(
                  credentialResponse.credential,
                  () => {
                    setLoading(false);
                    navigate('/');
                  },
                  () => {
                    setLoading(false);
                    alert('Google login failed');
                  }
                );
              }}
              onError={() => console.log('Login Failed')}
            />
          </GoogleOAuthProvider>
          </div>
          <div className="form-header-items flex justify-between items-center my-3 mx-2">
            <div><hr /></div>
            <div>or with email</div>
            <div><hr /></div>
          </div>
          <form action="">
            <fieldset>
              <legend>Full Name*</legend>
              <input type="text" placeholder='Enter your full name' required />
            </fieldset>
            <fieldset>
              <legend>Email*</legend>
              <input type="email" placeholder='Enter your email' required />
            </fieldset>
            <fieldset>
              <legend>Display Name*</legend>
              <input type="text" placeholder='Enter a unique dsplay name' required />
            </fieldset>
            <fieldset>
              <legend>Password*</legend>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  required />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Confirm Password*</legend>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  required />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </fieldset>
            <div className='terms-div'>
              <input type="checkbox" name="" id="" required className='me-2' />
              <p>Agree to the <a href="/terms-and-conditions" className='underlined-item'>Terms</a> and <a href="/privacy-policy" className='underlined-item'>Privacy Policy</a></p>
            </div>
            <a href=""><button type='submit'>Signup <FontAwesomeIcon icon={faArrowRight} /></button></a>
            <p>Already have an account? <span><a href="/login" className='underlined-item'> Login</a></span></p>
          </form>
        </div>
      </section>
    </>
  );
}
export default Login;
