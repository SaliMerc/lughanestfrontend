import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import auth_background from '../assets/login-signup-image.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function DashboardPayment() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [subscriptionStatus, setsubscriptionStatus] = useState(userDetails.subscription_status.has_active_subscription)

    const [subscriptionType, setsubscriptionType] = useState(userDetails.subscription_status.active_plan.subscription_type)

    return (
        <DashboardNavigation>

            <section
                className='form-element login-section flex flex-col'
                style={{
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {!subscriptionStatus && (
                <div className='form-div'>
                    <p className='mb-5 text-xl'>
                        <FontAwesomeIcon icon={faLock} />  Upgrade to continue Learning</p>
                    <p className='mb-2'>Your Current Plan: FREE TIER</p>
                    <ol className='ml-15 mb-3 list-decimal flex flex-col gap-2'>
                        <p><FontAwesomeIcon icon={faCheck} />  1 Full Course</p>
                        <p><FontAwesomeIcon icon={faCheck} />  Basic Dashboard</p>
                        <p><FontAwesomeIcon icon={faXmark} />  No chats</p>
                    </ol>

                    <p className='mb-2'><FontAwesomeIcon icon={faUnlock} /> Upgrade to Unlock:</p>
                    <ol className='ml-15 mb-3 list-decimal flex flex-col gap-2'>
                        <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                        <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                        <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                    </ol>
                    <div className='flex flex-col md:flex-row gap-8 md:justify-between'>
                        <Link to='/dashboard/subscription-plans'>
                            <button className='px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                View Subscription Plans
                            </button>
                        </Link>

                        <Link to='/payment-history'>
                            <button className='px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                My Payment History
                            </button>
                        </Link>
                    </div>
                </div>
             )} 

                {/* if they have an active subscription */}
                {subscriptionStatus && (
                <div className='form-div'>
                    <p className='mb-5 text-xl'>Your Current Plan: PREMIUM ({subscriptionType})</p>

                    <p className='mb-2'><FontAwesomeIcon icon={faUnlock} /> What you can access:</p>
                    <ol className='ml-15 mb-3 list-decimal flex flex-col gap-2'>
                        <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                        <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                        <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                    </ol>
                    <div className='flex flex-col md:flex-row gap-8 md:justify-between'>
                        <Link to='/dashboard/subscription-plans'>
                            <button className='px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                View Subscription Plans
                            </button>
                        </Link>

                        <Link to='/payment-history'>
                            <button className=' px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                My Payment History
                            </button>
                        </Link>
                    </div>
                </div>
                )}

            </section >

        </DashboardNavigation>
    );

}

export default DashboardPayment;