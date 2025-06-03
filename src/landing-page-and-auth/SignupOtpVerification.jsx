import { useState } from 'react';

import '../AuthForms.css';
import auth_background from '../assets/login-signup-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function SignUpOTPVerification(){

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
                <div className='heading-item'>OTP<span> Verification</span></div>
              </div>
              <form action="">
                <fieldset>
                  <legend>OTP*</legend>
                  <input type="tel" inputmode="numeric" pattern="[0-9]*" maxlength="6" placeholder='Enter the OTP' required/>
                </fieldset>
                <a href=""><button type='submit'>Verify Email <FontAwesomeIcon icon={faArrowRight} /></button></a>
              </form>
            </div>
        </section>
    </>
  );
}
export default  SignUpOTPVerification;
