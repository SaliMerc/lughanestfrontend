import { useLocation } from 'react-router-dom';

function InvalidLink() {
  const { state } = useLocation();
  const error = state?.error || 'This password reset link is invalid or expired';

  return (
    <div className="auth-container">
      <h1>Invalid Link</h1>
      <p>{error}</p>
      <a href="/password-reset">Request a new reset link</a>
    </div>
  );
}

export default InvalidLink;