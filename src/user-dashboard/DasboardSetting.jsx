import React from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

function DashboardSetting() {

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
                    <p className='mb-15 text-xl'>Account Settings & Security</p>
                    <div className='flex flex-col gap-8 md:justify-between'>
                        <Link to='/settings-change-password'>
                            <button className='px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                <FontAwesomeIcon icon={faPenToSquare} />Change Account Password
                            </button>
                        </Link>
                        <Link to='/settings-delete-account'>
                            <button className='!bg-[var(--dashboard-cancel-button-bg)] hover:!bg-[var(--dashboard-cancel-button-hover-bg)] !border-[var(--dashboard-cancel-button-border)] !text-[var(--dashboard-cancel-button-text)]'>
                                <FontAwesomeIcon icon={faTrash} />
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