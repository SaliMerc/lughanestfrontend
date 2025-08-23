import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { capitalizeFirst } from '../utils/slugUtils';

import profileImage from '../assets/dashboard-images/profile-pic-placeholder.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

import {cleanProfilePictureUrl} from '../utils/profilePic';

function DashboardProfile() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

     const [languages_spoken, setLanguagesSpoken] = useState(
        userDetails?.languages_spoken?.length > 0 
            ? userDetails.languages_spoken 
            : [{ language: "Not Added Yet" }]
    );


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
                <div className='form-div'>
                    <h1 className='mb-10 text-3xl font-bold text-[#FBEC6C]'>My Profile</h1>
                    <div className='flex flex-row gap-8 md:gap-5 mb-10 items-center'>
                        <div className='w-10 h-10 md:w-15 md:h-15 mr-4'>
                            <img src={userDetails.profile_picture_url || profileImage} alt="Profile Picture" className='rounded-full object-cover w-full h-full' />
                        </div>
                        <Link to='/profile-picture-update'>
                            <p><FontAwesomeIcon icon={faPenToSquare} /> Edit Photo</p>
                        </Link>
                    </div>
                    <div>
                        <p className='mb-2'>Username: {capitalizeFirst(userDetails.display_name)}</p>
                        <p className='mb-2'>Full Name: {capitalizeFirst(userDetails.first_name)} {capitalizeFirst(userDetails.last_name)}</p>
                        <p className='mb-2'>Email: {userDetails.email}</p>
                        <div className='flex flex-row items-center gap-3'>
                            <p className='mb-2'>Languages I Speak:</p>
                            <div className='flex flex-row flex-wrap gap-2'>
                                {languages_spoken.map((item, index) => (
                                    <div>
                                    <button
                                        key={index}
                                        className='!bg-[var(--button-bg)] !text-[var(--lang-button-text)] px-1 py-1 rounded-md'
                                    >
                                        {capitalizeFirst(item.language)}
                                    </button>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className='mt-6'>
                            <div className='flex flex-col md:flex-row md:justify-between'>
                                <Link to='/profile-update-details'>
                                    <button type='submit' className=''>
                                        Update Profile Details
                                    </button>
                                </Link>
                                <Link to='/profile-change-email'>
                                    <button type='submit' className=''>
                                        Update Email
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

export default DashboardProfile;