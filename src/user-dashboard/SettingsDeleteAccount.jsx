import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

function SettingsDeleteAccount() {
    const navigate = useNavigate();

    return (
        <DashboardNavigation>

            <section
                className='form-element flex flex-col'
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
                    <p className='mb-5 text-xl'>Are you sure you want to delete your account?</p>
                    <p>This will erase:</p>
                    <ol className='ml-15 mb-3 list-decimal'>
                        <li>All your personal data</li>
                        <li> All course progress</li>
                        <li>Payment history</li>
                        <li>Chat Logs</li>
                    </ol>
                    <div className='flex flex-col md:flex-row gap-8 md:justify-between'>
                            <button  className=' w-full md:w-[1.2rem] min-h-14 px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                Yes
                            </button>
                        <Link to='/dashboard-home'>
                            <button className='md:w-[1.2rem] w-full min-h-14 px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'>
                                No
                            </button>
                        </Link>
                    </div>
                </div>

                {/* if they alerady requested deletion */}
                 <div className='form-div'>
                    <p className='mb-5 text-xl text-[#FBEC6C]'>Deletion Scheduled</p>
                    <p>Your account will be deleted on: 25 May 2024</p>
                
                            <button  className=' w-full  min-h-14 px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                Cancel Account Deletion
                            </button>
                      
                   
                </div>

            </section >

        </DashboardNavigation>
    );
    
}

export default SettingsDeleteAccount;