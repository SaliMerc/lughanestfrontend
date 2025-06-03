import { useState } from 'react';

import '../AuthForms.css';
import auth_background from '../assets/password-reset-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function ChangePasswordReset() {
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
                <div className='heading-item'>Change<span> Password</span></div>
              </div>
              <form action="">
                <fieldset>
                  <legend>OTP*</legend>
                  <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder='Enter the OTP' required/>
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
                 <fieldset>
                  <legend>Confirm Password*</legend>
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
                <a href=""><button type='submit'>Change Password <FontAwesomeIcon icon={faArrowRight} /></button></a>
              </form>
            </div>
        </section>
    </>
  );
}
export default ChangePasswordReset;
