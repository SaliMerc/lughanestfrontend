import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import auth_background from '../assets/login-signup-image.png';

import { handleProfileUpdate } from '../utils/authUtils';

function ProfileUpdateDetails() {
    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        display_name: userDetails?.display_name || '',
        languages: [
            { language: '', level: 'Beginner' }
        ]
    });

    const [formError, setFormError] = useState('');

    const languageLevels = ['Beginner', 'Intermediate', 'Advanced'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLanguageChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.map((lang, i) => 
                i === index ? { ...lang, [field]: value } : lang
            )
        }));
    };

    const addLanguage = () => {
        setFormData(prev => ({
            ...prev,
            languages: [...prev.languages, { language: '', level: 'Beginner' }]
        }));
    };

    const removeLanguage = (index) => {
        if (formData.languages.length > 1) {
            setFormData(prev => ({
                ...prev,
                languages: prev.languages.filter((_, i) => i !== index)
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        try {
            const response = await handleProfileUpdate({
                display_name: formData.display_name,
                languages: formData.languages.filter(lang => lang.language.trim() !== '')
            });

            setFormError("Profile updated successfully!");
        } catch (error) {
            console.error('Update error:', error);
            const errorMessage = error?.response?.data?.message ||
                error?.message ||
                "Profile update failed. Please try again.";
            setFormError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

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
                        <div className='heading-item'>
                            <h1>
                                <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile Details
                            </h1>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='font-semibold'>Display Name</legend>
                            <input
                                type='text'
                                required
                                name='display_name'
                                value={formData.display_name}
                                onChange={handleChange}
                            />
                        </fieldset>



                        <fieldset>
                            <legend className='font-semibold flex items-center gap-2'>
                                Languages I Speak 
                                <div
                                    type='button'
                                    onClick={addLanguage}
                                    className='ml-2 w-6 h-6 bg-black text-white rounded-full flex items-center justify-center  transition-colors duration-200'
                                >
                                    <FontAwesomeIcon icon={faPlus} className='text-xs' />
                                </div>
                            </legend>

                            {formData.languages.map((lang, index) => (
                                <div key={index} className='flex gap-3 items-center mb-3'>
                                    <div className='flex-1'>
                                        <label className='block  mb-1'>Language</label>
                                        <input
                                            type='text'
                                            placeholder='e.g., English, Kiswahili'
                                            value={lang.language}
                                            onChange={(e) => handleLanguageChange(index, 'language', e.target.value)}
                                            className='w-full'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <label className='block  mb-1'>Level</label>
                                        <select
                                            value={lang.level}
                                            onChange={(e) => handleLanguageChange(index, 'level', e.target.value)}
                                            className='w-full text-white bg-[#0E0D0C]'
                                        >
                                            {languageLevels.map(level => (
                                                <option key={level} value={level}>{level}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {formData.languages.length > 1 && (
                                        <div
                                            type='button'
                                            onClick={() => removeLanguage(index)}
                                            className='w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200 mt-6'
                                        >
                                            <FontAwesomeIcon icon={faMinus} className='text-xs' />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </fieldset>

                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>

                        <div className='flex md:flex-row md:justify-between mt-5'>
                            <button 
                                type='submit' 
                                className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'
                            >
                                {loading ? "Updating..." : "Update"}
                            </button>
                            <Link to='/dashboard-profile'>
                                <button 
                                    type='button' 
                                    className='md:!w-[3rem] px-3 !bg-[rgb(14,13,12)] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[18px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#E11212] hover:!bg-[#E11212] hover:!text-[#E3E0C0] transition-colors !duration-300'
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </section>
        </DashboardNavigation>
    );
}

export default ProfileUpdateDetails;