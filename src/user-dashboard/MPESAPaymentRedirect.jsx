import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';
import { handleLatestPaymentStatus } from '../utils/paymentUtils';
import auth_background from '../assets/login-signup-image.png';

function MPESAPaymentRedirect() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    const [paymentStatus, setPaymentStatus] = useState('pending');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    useEffect(function () {
        const pollInterval = setInterval(function () {
            handleLatestPaymentStatus(
                {},
                function (response) {
                    console.log(response.data)
                    if (response.data.status === 'completed') {
                        console.log(response.data)
                        const updatedUser = {
                            ...userDetails,
                            subscription_status: {
                                has_active_subscription: response.data.has_active_subscription,
                                active_plan: response.data.active_plan
                            }
                        };

                        localStorage.setItem('user', JSON.stringify(updatedUser));

                        setPaymentStatus('success');
                        setPaymentAmount(response.data.amount)
                        clearInterval(pollInterval);

                        setTimeout(function () {
                            console.log("YAAY")
                        }, 5000);
                    } else if (response.data.status === 'failed') {
                        setPaymentStatus('failed');
                        setErrorMessage(response.data.message || 'Payment processing failed');
                        clearInterval(pollInterval);
                    } else if (response.data.status === 'pending') {
                        setPaymentStatus('pending');
                        setErrorMessage(response.data.message || 'Payment processing is still pending');
                        clearInterval(pollInterval);
                    }
                },
                function (error) {
                    setPaymentStatus('failed');
                    setErrorMessage(error.message || 'Error verifying payment status');
                    clearInterval(pollInterval);
                }
            );
        }, 3000);

        return function () {
            clearInterval(pollInterval);
        };
    }, [navigate]);


    useEffect(function () {
        if (paymentStatus === 'success') {
            const timer = setInterval(function () {
                setCountdown(function (prev) {
                    return prev - 1;
                });
            }, 1000);
            return function () {
                clearInterval(timer);
            };
        }
    }, [paymentStatus]);

    function renderContent() {
        switch (paymentStatus) {
            case 'pending':
                return (
                    <div className="text-left">
                        <p className="mb-5 text-xl font-semibold">Processing your payment...</p>
                        <div className="flex justify-left mb-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C]"></div>
                        </div>
                        <div className="">
                            <p className='mb-2'>A payment prompt has been sent to your Safaricom phone number via M-Pesa.</p>
                            <p>Enter your M-Pesa PIN to complete the transaction.</p>
                        </div>
                    </div>
                );
            case 'success':
                return (
                    <div className="text-left">
                        <div className="mb-4">
                        </div>
                        <p className="mb-3 text-xl font-semibold">✅ Payment Successful</p>
                        <p className="mb-5">Thank you! <br />Your Payment of ksh. {paymentAmount} was successful.</p>
                        <p className="mb-5">Full course and chat access unlocked</p>
                    </div>
                );
            case 'failed':
                return (
                    <div className="text-left">
                        <div className="text-red-500 mb-4">
                        </div>
                        <p className="mb-3 text-xl font-semibold">❌ Payment Failed</p>
                        <p className="mb-4 text-red-600">Sorry <br /> An error was encountered while making the payment.</p>
                        <p className="mb-4 text-red-600">Try again later!</p>
                        <div className="space-y-3">

                        </div>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <DashboardNavigation>
            <section
                className="form-element login-section"
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
                <div className="form-div max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                    {renderContent()}
                </div>
            </section>
        </DashboardNavigation>
    );
}

export default MPESAPaymentRedirect;