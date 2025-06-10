import { useLocation } from 'react-router-dom';
import auth_background from '../assets/password-reset-image.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

function InvalidLink() {
  const { state } = useLocation();
  const error = state?.error || 'This password reset link is invalid or expired';

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
        <p>Request a new link</p>

        <Link to="/resend-activation-link"><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-[1px] !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
          Request New Link
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        </Link>

      </div>
    </section>
  );
}

export default InvalidLink;