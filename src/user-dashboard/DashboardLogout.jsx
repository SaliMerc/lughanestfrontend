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
                            <button onClick={handleLogout} className=''>
                                Yes
                            </button>
                            </div>
                            <div>
                        <Link to='/dashboard-home'>
                            <button className='!border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'>
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