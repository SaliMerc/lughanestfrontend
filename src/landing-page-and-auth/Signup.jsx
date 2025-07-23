import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleGoogleLogin, handleEmailSignup, handleGettingLocation } from '../utils/authUtils';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import Header from './Header.jsx';

function Signup() {
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

  const [country, setCountryName] = useState('')
  const [city, setCity] = useState('')
  const [device_info, setDeviceIp] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword || !formData.email || !formData.fullName || !formData.displayName) {
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
    await handleGettingLocation(
      {},
      (response) => {
        const country = response.data.country_name;
        const city = response.data.city;
        const device_ip = response.data.ip;
        console.log(device_info)
        setCountryName(country)
        setCity(city);
        setDeviceIp(device_ip)
      },
      (error) => {
        console.log(error.error)
      }
    )
    await handleEmailSignup(
      {
        first_name: firstName,
        last_name: lastName,
        email: formData.email,
        username: formData.email,
        display_name: formData.displayName,
        accepted_terms_and_conditions: formData.agree,
        country: country,
        city: city,
        device_info: device_info,
        password: formData.password,
      },
      (response) => {
        if (response.data.message.includes("Activation link has been sent to your email address")) {
          setFormSuccess(response.data.message)
          setFormData({
            fullName: '',
            email: '',
            displayName: '',
            password: '',
            confirmPassword: '',
            agree: false,
          });
          setCountryName('');
          setCity('');
          setDeviceIp('');
        }
        else {
          setFormError(response.data.message || response.data.email || response.data.username || response.data.display_name)
        }
        setLoading(false);
      },
      (error) => {
        setLoading(false);

        if (error) {
          const errorMessages = Object.values(error).flat().join(' ');
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

  return (
    <>
  <Header/>
      <section className='form-element login-section' style={{
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
                    }
                  );
                }}
                onError={() => setFormError('Login Failed')}
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
              <p>Agree to the <Link to="/terms-and-conditions" className='underlined-item'>Terms</Link> and <Link to="/privacy-policy" className='underlined-item'>Privacy Policy</Link></p>
            </div>
            <div className="form-header-items flex justify-between items-center my-3 mx-2 text-red-700">
              <h5>{formError}</h5>
            </div>
            <div className="form-header-items flex justify-between items-center my-0 mx-2 text-green-700">
              <h5>{formSuccess}</h5>
            </div>
            <button type='submit'>{loading ? "Signing up..." : "Signup"} <FontAwesomeIcon icon={faArrowRight} /></button>
            <p>Already have an account? <span><a href="/login" className='underlined-item'> Login</a></span></p>
          </form>
        </div>
      </section>
    </>
  );
}
export default Signup;
