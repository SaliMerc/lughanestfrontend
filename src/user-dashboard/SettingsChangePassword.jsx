import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import auth_background from '../assets/login-signup-image.png';

import { useLocation, useNavigate } from 'react-router-dom';
import { handlePasswordChangeLoggedIn } from '../utils/authUtils';


function SettingsChangePassword() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const [formError, setFormError] = useState('');

    // change password logic starts here
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

        await handlePasswordChangeLoggedIn({
            old_password: formData.old_password,
            new_password: formData.new_password,
            confirm_password: formData.confirm_password
        },
            (response) => {
                setLoading(false);
                if (response.data.message.includes("Password updated successfully.")) {
                    navigate('/dashboard-home');
                }
                else {
                    setFormError(response.data.message)
                }
            },
            (error) => {
                console.log(error)
                setLoading(false);

                const errorData = error?.response?.data;

                if (errorData) {
                    setFormError(errorData.message)

                } else {

                    setFormError("Password change failed.");
                }
            }
        );
    };
    // change password logic ends here


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
                    <div className='form-title'>
                        <div className='heading-item'><h1>Change Password</h1></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='font-semibold'>Old Password</legend>
                            <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your old password'
                                    required
                                    name='old_password'
                                    value={formData.old_password}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className='eye-icon'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>New Password</legend>
                             <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your new password'
                                    required
                                    name='new_password'
                                    value={formData.new_password}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className='eye-icon'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            </div>

                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>Confirm Password</legend>
                             <div className='password-input-wrapper'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Confirm your new password'
                                    required
                                    name='confirm_password'
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEyeSlash : faEye}
                                    className='eye-icon'
                                    onClick={() => setShowPassword((prev) => !prev)}
                                />
                            </div>

                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <div className='flex md:flex-row md:justify-between'>
                            <button type='submit' className='md:!w-[10rem] px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <Link to='/dashboard-settings'>
                                <button type='submit' className='md:!w-[10rem] !bg-[var(--dashboard-cancel-button-bg)] hover:!bg-[var(--dashboard-cancel-button-hover-bg)] !border-[var(--dashboard-cancel-button-border)] !text-[var(--dashboard-cancel-button-text)]'>
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

export default SettingsChangePassword;