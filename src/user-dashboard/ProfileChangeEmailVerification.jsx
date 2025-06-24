import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import auth_background from '../assets/login-signup-image.png';

import { handleNewEmailUpdateVerification } from '../utils/authUtils';


function ProfileChangeEmailVerification() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const new_email=localStorage.getItem('newEmail');

    const [formData, setFormData] = useState({
        otp: ''
    });

    const [formError, setFormError] = useState('');

    // verify email logic starts here
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        try {
            const response = await handleNewEmailUpdateVerification({
                email:userDetails.email,
                new_email: new_email,
                otp: formData.otp
            });

            const updatedUser = {...userDetails, email: new_email};
            localStorage.setItem('user', JSON.stringify(updatedUser));
            localStorage.removeItem('newEmail');

            if (response?.message?.includes("Your email was updated successfully")) {
                navigate('/dashboard-profile');
            } else {
                setFormError(response?.message || "Your new email could not be verified.");
                console.log(response.message)
            }
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = error?.response?.message ||
                error?.message ||
                "Email update failed. Please try again.";
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    // verify email logic ends here


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
                    <div className='form-title'>
                        <div className='heading-item'><h1> OTP Verification</h1></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-emerald-500">
                            <h5>Enter the OTP sent to {new_email}</h5>
                        </div>
                             <fieldset>
                            <legend className='font-semibold'>OTP</legend>

                            <input
                                type='number'
                                placeholder='Enter the OTP'
                                required
                                name='otp'
                                value={formData.otp}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <div className='flex md:flex-row md:justify-between mt-5'>
                            <button type='submit' className='md:!min-w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                {loading ? "Verifying..." : "Verify Email"}
                            </button>
                        </div>

                    </form>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default ProfileChangeEmailVerification;