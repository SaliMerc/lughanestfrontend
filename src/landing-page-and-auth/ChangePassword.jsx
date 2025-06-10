import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { handleValidateResetToken, handleSubmitNewPassword } from '../utils/authUtils';
import '../AuthForms.css';
import auth_background from '../assets/password-reset-image.png';

function ChangePasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formIsLoading, setFormIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    new_password: '',
    confirm_password: ''
  });
  const [jwt, setJwtToken] = useState(null);

  // Getting the token parameters from the email url
  const uidb64 = searchParams.get('u');
  const token = searchParams.get('t');

  // Performing the first password reset check before displaying the reset page
  useEffect(() => {
    const validateToken = async () => {
      setIsLoading(true);

      try {
        await handleValidateResetToken(
          {
            uidb64: uidb64,
            token: token
          },
          (response) => {
            if (response.data.valid) {
              const jwt = response.data.jwt;
              setJwtToken(jwt);
              setValidToken(true);
            } else {
              navigate('/invalid-link', {
                state: { error: response.data.message || 'Invalid token' }
              });
            }
          },
          (error) => {
            navigate('/invalid-link', {
              state: { error: error.message || 'Token validation failed' }
            });
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [uidb64, token, navigate]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (formData.new_password !== formData.confirm_password) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.new_password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }

    setFormIsLoading(true);
    try {
      await handleSubmitNewPassword(
        {
          jwt: jwt,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password
        },
        (response) => {
          if (response.data.success) {
            navigate('/login');
          } else {
            setFormError(response.data.message || 'Password update failed');
          }
        },
        (error) => {
          const errorMsg = error.response?.data?.error ||
            error.response?.data?.message ||
            'Password reset failed';
          setFormError(errorMsg);
        }
      );
    } finally {
      setFormIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className='form-element' style={{
        backgroundImage: `url(${auth_background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="form-div">
          <div className="loading-spinner">Validating The Link...</div>
        </div>
      </section>
    );
  }

  if (!validToken) {
    return (
      <section className='form-element' style={{
        backgroundImage: `url(${auth_background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div className="form-div">
          <div className="error-message">Invalid or expired reset link</div>
        </div>
      </section>
    );
  }

  return (
    <section className='form-element' style={{
      backgroundImage: `url(${auth_background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="form-div">
        <div className='form-title'>
          <div className='heading-item'>Change<span> Password</span></div>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Password*</legend>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password (min 8 characters)"
                required
                name='new_password'
                value={formData.new_password}
                onChange={handleChange}
                minLength="8"
              />
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
                required
                name='confirm_password'
                value={formData.confirm_password}
                onChange={handleChange}
                minLength="8"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </fieldset>

          {formError && (
            <div className="error-message">
              {formError}
            </div>
          )}

          <button
            type='submit'
            // disabled={formIsLoading}
          >
            {formIsLoading ? 'Changing Password...' : 'Change Password'}
            {!formIsLoading && <FontAwesomeIcon icon={faArrowRight} />}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ChangePasswordReset;