import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

import { useLocation, useNavigate } from 'react-router-dom';


function SettingsChangePassword() {
    const userDetails = JSON.parse(localStorage.getItem('user'));


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
                        <div className='heading-item'><h1>Change Password</h1></div>
                    </div>
                    <form >
                        <fieldset>
                            <legend className='font-semibold'>Old Password</legend>
                            <input
                                type='text'
                                required
                                name='course_name'
                                value=''
                                placeholder='Enter Your old password'
                            />
                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>New Password</legend>
                            <input
                                type='text'
                                required
                                name='course_level'
                                value=''
                                placeholder='Enter new password'
                                className=''
                            />

                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>Confirm Password</legend>
                            <input
                                type='text'
                                required
                                name='instructor_name'
                                value=''
                                placeholder='Confirm new password'
                            />

                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5></h5>
                        </div>
                        <div className='flex md:flex-row md:justify-between'>
                            <button type='submit' className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                Update
                            </button>
                            <Link to='/dashboard-settings'>
                            <button type='submit' className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'>
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