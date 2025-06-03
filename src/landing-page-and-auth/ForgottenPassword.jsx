import { useState } from 'react';

import '../AuthForms.css';
import auth_background from '../assets/password-reset-image.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faArrowRight,faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


function ForgottenPassword() {

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
                <div className='heading-item'>Password<span> Reset</span></div>
              </div>
              <form action="">
                <fieldset>
                  <legend>Email*</legend>
                  <input type="email" placeholder='Enter your email' required />
                </fieldset>
                <a href=""><button type='submit'>Reset Password <FontAwesomeIcon icon={faArrowRight} /></button></a>
              </form>
            </div>
        </section>
    </>
  );
}
export default ForgottenPassword;
