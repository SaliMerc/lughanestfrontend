import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

import auth_background from '../assets/login-signup-image.png';
import { handleCheckDeletionStatus, handleScheduleAccountDeletion,handleUndoAccountDeletion } from '../utils/authUtils';

function SettingsDeleteAccount() {
  const [accountDeletion, setAccountDeletion] = useState(null)
  const [deletionDate, setDeletionDate] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const checkDeletionStatus = async () => {
      try {
        setIsLoading(true);
        const data = await handleCheckDeletionStatus();
        setAccountDeletion(data.is_scheduled_for_deletion);
        setDeletionDate(data.scheduled_date)
      } catch (err) {
        console.error('Error checking deletion status:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkDeletionStatus();
  }, []);

  const handleScheduleDeletion = async () => {
    try {
      setButtonLoading(true);
      const data = await handleScheduleAccountDeletion();
      setAccountDeletion(data.is_scheduled_for_deletion);
      setDeletionDate(data.scheduled_date);
      setButtonLoading(false)

    } catch (err) {
      console.error('Error scheduling account deletion:', err);
      setButtonLoading(false);
    }
  };

    const undoDeletion = async () => {
    try {
      setButtonLoading(true);
      const data = await handleUndoAccountDeletion();
      setAccountDeletion(data.is_scheduled_for_deletion);
      setButtonLoading(false)

    } catch (err) {
      console.error('Error undoing account deletion:', err);
      setButtonLoading(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardNavigation>
        <div className="w-full text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
        </div>
      </DashboardNavigation>
    );
  }

  return (
    <DashboardNavigation>

      <section
        className='form-element flex flex-col login-section'
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
        {!accountDeletion && (
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
              <button onClick={handleScheduleDeletion} className=' w-full px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                {buttonLoading ? "Deleting..." : "Yes"}
              </button>
              <Link to='/dashboard-settings'>
                <button className='!bg-[var(--dashboard-cancel-button-bg)] hover:!bg-[var(--dashboard-cancel-button-hover-bg)] !border-[var(--dashboard-cancel-button-border)] !text-[var(--dashboard-cancel-button-text)]'>
                  No
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* if they alerady requested deletion */}
        {accountDeletion && (
          <div className='form-div'>
            <p className='mb-5 text-xl text-[#FBEC6C]'>Deletion Scheduled</p>
            <p>Your account will be deleted on: {deletionDate}</p>

            <button onClick={undoDeletion} className=' w-full px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
              {buttonLoading ? "Cancelling your deletion request..." : "Cancel Account Deletion"}
            </button>
          </div>
        )}

      </section >

    </DashboardNavigation>
  );

}

export default SettingsDeleteAccount;