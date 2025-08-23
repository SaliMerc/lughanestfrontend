import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import GoogleLoginButton from '../components/GoogleLogin';

import { handleGoogleLogin, handleEmailLogin } from '../utils/authUtils';


import auth_background from '../assets/login-signup-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Header from './Header.jsx';

import { Link} from 'react-router-dom';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const Google_Client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [formError, setFormError] = useState('');


  // Login logic starts here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setFormError('Please enter both your email and password to login.');
      return;
    };

    setFormError('');

    setLoading(true);

    await handleEmailLogin({
      username: formData.username,
      password: formData.password
    },
      (response) => {
        setLoading(false);
        if (response.data.message.includes("Logged in successfully")) {
          localStorage.setItem('access_token', response.data.access_token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          navigate('/dashboard-home');
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

          setFormError("Login failed.");
        }
      }
    );
  };
  // login logic ends

  return (
    <>
  <Header/>
    <section
      className='form-element login-section'
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='form-div'>
        <div className='form-title'>
          <div className='heading-item'>Login</div>
        </div>

        <div className='login-with-google flex justify-center items-center'>
          <GoogleOAuthProvider clientId={Google_Client_Id}>
            <GoogleLogin
              size='large'
              width={335}
              shape="pill"
              text="continue_with"
              onSuccess={(credentialResponse) => {
                setLoading(true)
                handleGoogleLogin(
                  credentialResponse.credential,
                  () => {
                    setLoading(false);
                    navigate('/dashboard-home');
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

        <div className='form-header-items flex justify-between items-center my-3 mx-2'>
          <div><hr /></div>
          <div>or with email</div>
          <div><hr /></div>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Email*</legend>
            <input
              type='email'
              placeholder='Enter your email'
              required
              name='username'
              value={formData.username}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>Password*</legend>
            <div className='password-input-wrapper'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                required
                name='password'
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className='eye-icon'
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </fieldset>
          <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
            <h5>{formError}</h5>
          </div>
          <div className='forgotten-pass-container'>
            <Link to='/password-reset' className='underlined-item forgotten-pass'>
              Forgotten Password?
            </Link>
          </div>

          <button type='submit'>
            {loading ? "Logging in..." : "Login"}  <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <p>
            Don't have an account?{' '}
            <span>
              <Link to='/signup' className='underlined-item'>
                SignUp
              </Link>
            </span>
          </p>
        </form>
      </div>

    </section >
    </>
  );
}

export default Login;
