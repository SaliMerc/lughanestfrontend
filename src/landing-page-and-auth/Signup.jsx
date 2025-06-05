import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin, handleEmailSignup } from '../utils/authUtils';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const Google_Client_Id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // signup functionality starts here
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    displayName: '',
    password: '',
    confirmPassword: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword|| !formData.email|| !formData.fullName|| !formData.displayName) {
      setFormError('All fields are required')
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match')
      return;
    }

    if (!formData.agree) {
      setFormError('Please agree to the terms and privacy policy')
      return;
    }

    setFormError('');

    setLoading(true);

    const [firstName, ...rest] = formData.fullName.trim().split(' ');
    const lastName = rest.join(' ') || '';
    await handleEmailSignup(
      {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        username: formData.email,
        display_name: formData.displayName,
        accepted_terms_and_conditions: formData.agree,
        password: formData.password,
      },
      () => {
        setLoading(false);
        sessionStorage.setItem('otp-email', formData.email);
        navigate('/signup-otp-verification');
      },
      (err) => {
        setLoading(false);

        const errorData = err?.response?.data;

        if (errorData) {
          const errorMessages = Object.values(errorData).flat().join(' ');
          if (errorMessages) {
            setFormError("A user with this email or display name already exists");
          }

        } else {

          setFormError("Signup failed. Please check your input and try again.");
        }
      }
    );
  };

  // signup functionality ends here

  if (loading) {
    return (
      <div className="flex items-center justify-center h-3/4 bg-gradient-to-br from-[#8F5932] to-[#8F5932] mt-28">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-[#E3E0C0] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#FBEC6C] text-lg font-semibold animate-pulse">Creating your account...</p>
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
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Full Name*</legend>
              <input
                type="text"
                placeholder='Enter your full name'
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                required />
            </fieldset>
            <fieldset>
              <legend>Email*</legend>
              <input
                type="email"
                placeholder='Enter your email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required />
            </fieldset>
            <fieldset>
              <legend>Display Name*</legend>
              <input
                type="text"
                placeholder='Enter a unique dsplay name'
                name='displayName'
                value={formData.displayName}
                onChange={handleChange}
                required />
            </fieldset>
            <fieldset>
              <legend>Password*</legend>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
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
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required />
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                />
              </div>
            </fieldset>
            <div className='terms-div'>
              <input
                type="checkbox"
                name='agree'
                checked={formData.agree}
                onChange={handleChange}
                required
                className='me-2' />
              <p>Agree to the <a href="/terms-and-conditions" className='underlined-item'>Terms</a> and <a href="/privacy-policy" className='underlined-item'>Privacy Policy</a></p>
            </div>
            <div className="form-header-items flex justify-between items-center my-3 mx-2 text-red-700">
              <h5>{formError}</h5>
            </div>
            <button type='submit'>Signup <FontAwesomeIcon icon={faArrowRight} /></button>
            <p>Already have an account? <span><a href="/login" className='underlined-item'> Login</a></span></p>
          </form>
        </div>
      </section>
    </>
  );
}
export default Login;
