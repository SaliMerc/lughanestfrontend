import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { handleSubscriptiontemsData } from '../utils/paymentUtils.js';

import auth_background from '../assets/login-signup-image.png';

function MPESAPaymentRedirect() {
 
    return (
        <DashboardNavigation>

            <section
                className='form-element'
                style={{
                    backgroundImage: `url(${auth_background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='form-div'>
                    <p className='mb-5 text-xl font-semibold'>Processing your payment...</p>
                    <p className='mb-3'>A payment prompt has been sent to your Safaricom phone number via M-Pesa.</p>
                    <p>Please check your phone and enter your M-Pesa PIN to complete the transaction.</p>

                </div>

            </section >

        </DashboardNavigation >
    );
}

export default MPESAPaymentRedirect;