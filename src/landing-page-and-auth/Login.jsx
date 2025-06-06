import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin, handleEmailLogin } from '../utils/authUtils';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

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
      setFormError('Please enter both your email ad passoword to login.');
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
          navigate('/');
          // sessionStorage.removeItem('otp-email')
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-3/4 bg-gradient-to-br from-[#8F5932] to-[#8F5932] mt-40">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#E3E0C0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#FBEC6C] text-lg font-semibold animate-pulse">Signing you in...</p>
        </div>
      </div>
    );
  }



  return (
    <section
      className='form-element'
      style={{
        backgroundImage: `url(${auth_background})`,
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
          <a href='/password-reset' className='underlined-item forgotten-pass'>
            Forgotten Password?
          </a>
        </div>

        <button type='submit'>
          Login <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <p>
          Don't have an account?{' '}
          <span>
            <a href='/signup' className='underlined-item'>
              SignUp
            </a>
          </span>
        </p>
      </form>
    </div>
    </section >
  );
}

export default Login;
