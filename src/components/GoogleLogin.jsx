// GoogleLoginButton.jsx
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ 
  buttonText = "Continue with Google", 
  onSuccess, 
  onError, 
  isLoading = false,
  size = "default"
}) => {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      onSuccess(credentialResponse);
    },
    onError: () => {
      onError();
    },
  });

  const buttonStyles = {
    default: {
      width: '235px',
      height: '44px',
      fontSize: '15px'
    },
    large: {
      width: '335px',
      height: '50px',
      fontSize: '16px'
    }
  };

  const currentStyle = buttonStyles[size] || buttonStyles.default;

  return (
    <button
      onClick={login}
      disabled={isLoading}
      className="google-login-btn"
      style={{
        width: currentStyle.width,
        height: currentStyle.height,
        backgroundColor: '#fff',
        border: '1px solid #dadce0',
        borderRadius: '24px',
        fontSize: currentStyle.fontSize,
        fontWeight: 500,
        color: '#3c4043',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        margin: '10px 0',
      }}
      onMouseOver={(e) => {
        if (!isLoading) {
          e.target.style.backgroundColor = '#f8f9fa';
          e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.15)';
        }
      }}
      onMouseOut={(e) => {
        if (!isLoading) {
          e.target.style.backgroundColor = '#fff';
          e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
      }}
    >
      {isLoading ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className="spinner" style={{
            width: '18px',
            height: '18px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #4285F4',
            borderRadius: '50%',
            marginRight: '8px',
            animation: 'spin 1s linear infinite'
          }}></div>
          Processing...
        </div>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '12px' }}>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {buttonText}
        </>
      )}
    </button>
  );
};

export default GoogleLoginButton;