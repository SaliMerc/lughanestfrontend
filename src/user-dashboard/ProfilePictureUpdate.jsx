import React from 'react';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faUser, faCamera } from '@fortawesome/free-solid-svg-icons';
import auth_background from '../assets/login-signup-image.png';
import { handleProfileUpdate } from '../utils/authUtils';

function ProfilePictureUpdate() {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('user')));

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(userDetails?.profile_picture || null);
    const [formError, setFormError] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                setFormError('Please select a valid image file (JPEG, JPG, or PNG).');
                return;
            }

            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                setFormError('File size must be less than 5MB.');
                return;
            }

            setFormError('');
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewUrl(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            setFormError('Please select a picture to upload.');
            return;
        }

        setFormError('');
        setLoading(true);

        try {
            const uploadData = new FormData();
            uploadData.append('profile_picture', selectedFile);


            const response = await handleProfileUpdate(uploadData);

             const updatedUser = {
            ...JSON.parse(localStorage.getItem('user')), 
            profile_picture: response.user.profile_picture 
        };

            localStorage.setItem('user', JSON.stringify(updatedUser));

            if (response?.message?.includes("Profile updated successfully")) {
                navigate('/dashboard-profile');
            }
        } catch (error) {
            console.error('Profile picture update error:', error);
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                "Profile picture update failed. Please try again.";
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const resetPicture = () => {
        setSelectedFile(null);
        setPreviewUrl(userDetails?.profile_picture || null);
        setFormError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
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
                    <div className='form-title'>
                        <div className='heading-item'>
                            <h1>
                                <FontAwesomeIcon icon={faPenToSquare} /> Update Profile Picture
                            </h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className='flex flex-col items-center mb-6'>
                            <div className='relative mb-4'>
                                <div
                                    className='w-32 h-32 rounded-full overflow-hidden border-4 border-[#FBEC6C] bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity duration-200'
                                    onClick={triggerFileInput}
                                >
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="text-4xl text-gray-400"
                                        />
                                    )}
                                </div>

                                <div
                                    className='absolute bottom-0 right-0 w-8 h-8 bg-[#FBEC6C] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#E3E0C0] transition-colors duration-200'
                                    onClick={triggerFileInput}
                                >
                                    <FontAwesomeIcon icon={faCamera} className="text-[#0E0D0C] text-sm" />
                                </div>
                            </div>

                            <div
                                type='button'
                                onClick={triggerFileInput}
                                className='md:!w-[15rem] md:h-10 text-center px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'
                            >
                                Upload New Picture
                            </div>

                            <input
                                ref={fileInputRef}
                                type="file"
                                name='profile_picture'
                                accept=".jpeg,.jpg,.png"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        {selectedFile && (
                            <div className='text-center mb-4 text-sm text-gray-600'>
                                <p>Selected: {selectedFile.name}</p>
                                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                        )}

                        <div className='text-center mb-4 text-sm text-gray-500'>
                            <p>Accepted Formats: .jpeg, .jpg, .png</p>
                            <p>Maximum Size: 5MB</p>
                        </div>

                        <div className="form-header-items flex justify-center items-center my-4 text-red-700">
                            <h5>{formError}</h5>
                        </div>

                        <div className='flex flex-col md:flex-row md:justify-between'>
                            <button
                                disabled={!selectedFile || loading}
                                type='submit' className='md:!w-[10rem] px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                {loading ? "Updating..." : "Update"}
                            </button>

                            {selectedFile && (
                                <div>
                                      <button
                                    type='button'
                                    onClick={resetPicture}
                                    className='md:!w-[10rem] px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'
                                >
                                    Reset
                                </button>
                                </div>
                              
                            )}

                            <div>
                                  <Link to='/dashboard-profile'>
                                <button type='submit' className='md:!w-[10rem] !bg-[var(--dashboard-cancel-button-bg)] hover:!bg-[var(--dashboard-cancel-button-hover-bg)] !border-[var(--dashboard-cancel-button-border)] !text-[var(--dashboard-cancel-button-text)]'>
                                    Cancel
                                </button>
                            </Link>
                            </div>

                          
                        </div>
                    </form>
                </div>
            </section>
        </DashboardNavigation>
    );
}

export default ProfilePictureUpdate;