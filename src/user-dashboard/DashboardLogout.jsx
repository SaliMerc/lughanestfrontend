import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

function DashboardLogout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');

        navigate('/login');
    };



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
                    <p className='mb-15 text-xl'>Are you sure you want to logout?</p>
                    <div className='flex flex-col md:flex-row gap-8 md:!justify-between'>
                        <div>
                            <button onClick={handleLogout} className='md:!w-[10rem] px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                Yes
                            </button>
                            </div>
                            <div>
                        <Link to='/dashboard-home'>
                            <button className='md:!w-[10rem] !bg-[var(--dashboard-cancel-button-bg)] hover:!bg-[var(--dashboard-cancel-button-hover-bg)] !border-[var(--dashboard-cancel-button-border)] !text-[var(--dashboard-cancel-button-text)]'>
                                No
                            </button>
                        </Link>
                        </div>
                    </div>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default DashboardLogout;