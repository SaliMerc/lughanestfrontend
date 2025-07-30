import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { handleMpesaPayment } from '../utils/paymentUtils';
import auth_background from '../assets/login-signup-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import DashboardNavigation from './DashboardHeader';

import { Link, useLocation } from 'react-router-dom';

function MPESAPayment() {
    const location = useLocation();
    const { subscription_type, amount } = location.state || {}
    console.log(subscription_type, amount)

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        phone: '',
        amount: amount,
        subscription_type: subscription_type
    });


    const [formError, setFormError] = useState('');


    // Payment logic starts here
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.phone) {
            setFormError('Please enter your phone number');
            return;
        };

        setFormError('');

        setLoading(true);

        await handleMpesaPayment({
            phone: formData.phone,
            amount: formData.amount,
            subscription_type: formData.subscription_type
        },
            (response) => {
                setLoading(false);
                if (response?.data?.success === true) {
                    navigate('/dashboard/mpesa-payment');
                }
                else {
                    setFormError("Payment request not accepted. Please try again.")
                }
            },
            (error) => {
                setLoading(false);

                const errorData = error?.response?.data;

                if (errorData) {
                    setFormError(errorData.message)

                } else {

                    setFormError("Login failed.");
                }
            }
        );
    };
    // Payment logic ends

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

                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>Phone Number*</legend>
                            <input
                                type='number'
                                placeholder='Enter your phone number'
                                required
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Amount</legend>
                            <div className=''>
                                <input
                                    type='number'
                                    required
                                    name='amount'
                                    value={formData.amount}
                                    readOnly
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <div className='forgotten-pass-container'>
                            <Link to='/dashboard/subscription-plans' className='underlined-item forgotten-pass'>
                                Back to Subscriptions
                            </Link>
                        </div>

                        <button type='submit'>
                            {loading ? "Processing..." : "Request Payment"}  <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </form>
                </div>

            </section >
        </DashboardNavigation>
    );
}

export default MPESAPayment;
