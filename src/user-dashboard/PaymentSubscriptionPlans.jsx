import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';


import { handleSubscriptiontemsData } from '../utils/paymentUtils.js';

import auth_background from '../assets/login-signup-image.png';
import pricingPremiumMonth from '../assets/pricing-premium-month.svg';
import pricingPremiumYear from '../assets/pricing-premium-year.svg';


function PaymentSubscription() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    const [monthlySubscription, setMonthlySubscription] = useState(userDetails.subscription_items.monthly_plan);
    const [yearlySubscription, setYearlySubscription] = useState(userDetails.subscription_items.yearly_plan);
    const [currency, setCurrency] = useState(userDetails.subscription_items.currency);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    return (
        <DashboardNavigation>

            <section
                className='form-element login-section'
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
                <div className='form-div'>
                    <div className='flex flex-col gap-5 md:flex-row justify-between'>
                        <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[var(--payment-bg)] flex flex-col justify-center items-center text-center gap-18 rounded-[20px] border'>
                            <div className='flex flex-col items-center gap-2'>
                                <p>PREMIUM</p>
                                <img src={pricingPremiumMonth} alt="about-image" className='h-[30px] md:h-[40px]' />
                                <p className='text-[1.2rem] md:text-[1.5rem]'>{currency || "Kshs."} {monthlySubscription || "700"}/month</p>
                            </div>
                            <div className='flex flex-col items-start text-left gap-2'>
                                <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                                <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                                <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                                <Link to="/dashboard/subscription-plans/subscribe"
                                    state={{
                                        subscription_type: 'monthly',
                                        amount: monthlySubscription
                                    }}
                                ><button className='min-w-36 min-h-14 px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                        Subscribe
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[var(--payment)] flex flex-col justify-center items-center text-center gap-18 rounded-[20px] border'>
                            <div className='flex flex-col items-center gap-2'>
                                <p>PREMIUM</p>
                                <img src={pricingPremiumYear} alt="about-image" className='h-[30px] md:h-[40px]' />
                                <p className='text-[1.2rem] md:text-[1.5rem]'>{currency || "Kshs."} {yearlySubscription || "8000"}/year</p>
                            </div>
                            <div className='flex flex-col items-start text-left gap-2'>
                                <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                                <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                                <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                                <Link to="/dashboard/subscription-plans/subscribe"
                                    state={{
                                        subscription_type: 'yearly',
                                        amount: yearlySubscription
                                    }}
                                ><button className='min-w-36 min-h-14 px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                        Subscribe
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default PaymentSubscription;