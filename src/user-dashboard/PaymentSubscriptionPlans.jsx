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
    const [monthlySubscription, setMonthlySubscription] = useState('');
    const [yearlySubscription, setYearlySubscription] = useState('');
    const [currency, setCurrency] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetching the subscription plans
    useEffect(() => {
        const fetchSubscriptions = async () => {
            try {
                setLoading(true);
                await handleSubscriptiontemsData(
                    {},
                    (response) => {
                        if (response.data) {
                            setMonthlySubscription(response.data.monthly_plan);
                            setYearlySubscription(response.data.yearly_plan);
                            setCurrency(response.data.currency);
                        } else {
                            setMonthlySubscription('700');
                            setYearlySubscription('8000');
                            setMonthlyCurrency('Ksh.');
                        }
                    },
                    (error) => {
                        setError(error.message || 'Failed to fetch plans');
                    }
                );
            } catch (err) {
                setError(err.message || 'An unexpected error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, []);


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
                    <div className='flex flex-col gap-5 md:flex-row justify-between'>
                        <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-18 rounded-[20px]'>
                            <div className='flex flex-col items-center gap-2'>
                                <p>PREMIUM</p>
                                <img src={pricingPremiumMonth} alt="about-image" className='h-[30px] md:h-[40px]' />
                                <p className='text-[1.2rem] md:text-[1.5rem]'>{currency} {monthlySubscription}/month</p>
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
                                ><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                        Subscribe
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[#000000] flex flex-col justify-center items-center text-center gap-18 rounded-[20px]'>
                            <div className='flex flex-col items-center gap-2'>
                                <p>PREMIUM</p>
                                <img src={pricingPremiumYear} alt="about-image" className='h-[30px] md:h-[40px]' />
                                <p className='text-[1.2rem] md:text-[1.5rem]'>{currency} {yearlySubscription}/year</p>
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
                                ><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
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