import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleSignupTokenVerification } from '../utils/authUtils';
import auth_background from '../assets/login-signup-image.svg';


function SignupVerification() {
  const navigate = useNavigate();
  const [verificationIsLoading, setVerificationLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [validToken, setValidToken] = useState(false);

  const jwt = searchParams.get('t');

  useEffect(() => {
    const validateToken = async () => {
      setVerificationLoading(true);

      try {
        await handleSignupTokenVerification(
          {
            jwt: jwt,
          },
          (response) => {
            console.log(response.data)
            
              if(response.data.message.includes('Your account was verified successfully')||('Your account has already been verified.')){
                navigate('/login')
              
              setValidToken(true);}
             else {
              navigate('/invalid-link',
                {
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
        setVerificationLoading(false);
      }
    };

    validateToken();
  }, [jwt, navigate]);


  if (verificationIsLoading) {
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
          <div className="loading-spinner">Verifying your account...</div>
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
          <div className="error-message">Invalid or expired verification link</div>
        </div>
      </section>
    );
  }


}
export default SignupVerification;
