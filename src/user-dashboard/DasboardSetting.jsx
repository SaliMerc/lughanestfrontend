import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

function  DashboardSetting() {
    
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
                    <p className='mb-15 text-xl'>Account Settings & Security</p>
                    <div className='flex flex-col md:flex-row gap-8 md:justify-between'>
                        <Link to='/settings-change-password'>
                            <button  className=' w-full md:min-w-[1.2rem] min-h-14 px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                Change Account Password
                            </button>
                            </Link>
                            <Link to='/settings-delete-account'>
                            <button className='md:min-w-[1.2rem] w-full min-h-14 px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'>
                                Request Account Deletion
                            </button>
                            </Link>
                    </div>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default DashboardSetting;