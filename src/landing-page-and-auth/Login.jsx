import { useState } from 'react';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function Login() {
   const [showPassword, setShowPassword] = useState(false);

  return (
    <>
        <section className='form-element' style={{
              backgroundImage: `url(${auth_background})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              minHeight:'100vh',
              width:'100%',
              display:'flex',
              justifyContent: 'center',
              alignItems: 'center'

        }} >
            <div className="form-div">
              <div className='form-title'>
                <div className='heading-item'>Login</div>
              </div>
              <div className='login-with-google'>
                  <a href=""><button type='button'>Continue with Google</button></a>
              </div>
              <div className="form-header-items flex justify-between items-center my-3 mx-2">
                <div><hr /></div>
                <div>or with email</div>
                <div><hr /></div>
              </div>
              <form action="">
                <fieldset>
                  <legend>Email*</legend>
                  <input type="email" placeholder='Enter your email' required />
                </fieldset>
                <fieldset>
                  <legend>Password*</legend>
                   <div className="password-input-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                       required/>
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        className="eye-icon"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                </fieldset>
                <div>
                  <div className="forgotten-pass-container">
                   <a href="/password-reset" className="underlined-item forgotten-pass">Forgotten Password?</a>
                </div>
                </div>
                <a href=""><button type='submit'>Login <FontAwesomeIcon icon={faArrowRight} /></button></a>
                <p>Don't have an account? <span><a href="/signup" className='underlined-item'> SignUp</a></span></p>
              </form>
            </div>
        </section>
    </>
  );
}
export default Login;
