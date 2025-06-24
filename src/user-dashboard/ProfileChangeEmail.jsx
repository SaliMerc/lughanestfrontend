import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import auth_background from '../assets/login-signup-image.png';

import { handleProfileUpdate } from '../utils/authUtils';


function ProfileChangeEmail() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: ''
    });

    const [formError, setFormError] = useState('');

    // change email logic starts here
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
            const response = await handleProfileUpdate({
                email: formData.email
            });
            localStorage.setItem('newEmail', formData.email);

            if (response?.message?.includes("Email verification sent.")) {
                navigate('/profile-change-email-verification');
            } else {
                setFormError(response?.data?.message || "Email update completed but no verification was sent.");
            }
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                "Email update failed. Please try again.";
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    // change email logic ends here


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
                        <div className='heading-item'><h1> <FontAwesomeIcon icon={faPenToSquare} /> Edit Email Address</h1></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='font-semibold'>Current Email</legend>

                            <input
                                type='email'
                                required
                                name='old_email'
                                value={userDetails.email}
                                readOnly
                            />
                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>New Email</legend>

                            <input
                                type='email'
                                placeholder='Enter your new password'
                                required
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />


                        </fieldset>


                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <div className='flex md:flex-row md:justify-between mt-5'>
                            <button type='submit' className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <Link to='/dashboard-profile'>
                                <button type='button' className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'>
                                    Cancel
                                </button>
                            </Link>
                        </div>

                    </form>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default ProfileChangeEmail;