import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { generateSlug } from '../utils/slugUtils';
import { handleFindPartners } from '../utils/chatUtils';
import { capitalizeFirst } from '../utils/slugUtils';
import SearchBar from '../components/SearchBar';

import profileImage from '../assets/dashboard-images/profile-pic-placeholder.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

import { cleanProfilePictureUrl } from '../utils/profilePic';

function DashboardFindPartners() {
    const [allPartners, setAllPartners] = useState([]); 
    const [filteredPartners, setFilteredPartners] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');

    const userDetails = JSON.parse(localStorage.getItem('user'));
    const [subscriptionStatus, setSubscriptionStatus] = useState(userDetails?.subscription_status?.has_active_subscription || false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const CACHE_KEY = 'partnersCache';
    const CACHE_EXPIRY = 5 * 60 * 1000; 

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true);

                const cachedData = localStorage.getItem(CACHE_KEY);
                const now = new Date().getTime();

                if (cachedData) {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (now - timestamp < CACHE_EXPIRY) {
                        setAllPartners(data);
                        setFilteredPartners(data);
                        setLoading(false);
                        return;
                    }
                }

                const response = await handleFindPartners();

                if (response?.data) {
                    setAllPartners(response.data);
                    setFilteredPartners(response.data);

                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: response.data,
                        timestamp: now
                    }));
                } else {
                    setAllPartners([]);
                    setFilteredPartners([]);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch partners');
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    // Filter partners based on search term
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredPartners(allPartners);
            return;
        }

        const filtered = allPartners.filter(partner => {
            const searchLower = searchTerm.toLowerCase();

            // Check display name
            if (partner.display_name.toLowerCase().includes(searchLower)) {
                return true;
            }

            // Check courses they're learning
            return partner.courses.some(course =>
                course.course_name.toLowerCase().includes(searchLower) ||
                course.course_level.toLowerCase().includes(searchLower)
            );
        });

        setFilteredPartners(filtered);
    }, [searchTerm, allPartners]);

    return (
        <DashboardNavigation>
            <div className="p-4">
                <section>
                    <h1 className='text-2xl md:text-4xl font-semibold mb-6'>Find Partners</h1>

                    <div className="flex-grow mb-6">
                        <SearchBar
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or language..."
                        />
                    </div>

                    <section className='flex flex-row flex-wrap justify-left gap-3 md:gap-12 items-start py-7'>
                        {loading ? (
                            <div className="w-full text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                                <p className="mt-4">Loading partners...</p>
                            </div>
                        ) : error ? (
                            <div className="w-full text-center py-10 text-red-500">
                                <p>{error}</p>
                            </div>
                        ) : filteredPartners.length === 0 ? (
                            <div className="w-full text-center py-10">
                                <p>{searchTerm ? 'No partners match your search' : 'No partners to show'}</p>
                            </div>
                        ) : (
                            filteredPartners.map((partner, index) => (
                                <div key={index} className='h-[350px] w-[10rem] md:w-[20%]  bg-[var(--dashboard-card-bg)] flex flex-col rounded-[20px] relative'>
                                    <div className='flex flex-col items-start text-left gap-2 p-3 h-full'>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div className='w-10 h-10 md:w-15 md:h-15 mr-4'>
                                                <img
                                                    src={partner.profile_picture_url || profileImage}
                                                    alt="Profile"
                                                    className='rounded-full object-cover w-full h-full'
                                                />
                                            </div>
                                            <div>
                                                <p className='font-medium'>{capitalizeFirst(partner.display_name)}</p>
                                            </div>
                                        </div>

                                        <p className='text-[1.2rem] md:text-[1.2rem] text-[#FBEC6C] first-letter:uppercase mt-2'>Learning:</p>
                                        <hr className='text-white w-full' />

                                        <div className='flex-grow overflow-y-auto'>
                                            {partner.courses.map((course, courseIndex) => (
                                                <p key={courseIndex} className='text-[#FBEC6C] first-letter:uppercase mb-2'>
                                                    {course.course_name} ({course.course_level})
                                                </p>
                                            ))}
                                        </div>

                                        <div className="w-full mt-auto pt-3">
                                            {subscriptionStatus ? (
                                                <Link
                                                    to={`/dashboard-chats/chat-interface/${generateSlug(partner.display_name)}`}
                                                    state={{
                                                        partnerId: partner.id,
                                                        partnerName: partner.display_name
                                                    }}
                                                >
                                                    <button className='w-full py-2   !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] !hover:!text-[#0E0D0C] transition-colors'>
                                                        Message
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link to="/dashboard/subscription-plans">
                                                    <button className='w-full py-2 !text-[0.8rem] md:!text-[1rem] !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] !hover:!text-[#0E0D0C]  transition-colors flex items-center justify-center gap-1'>
                                                        <FontAwesomeIcon icon={faLock} />
                                                        <span>Subscribe to Message</span>
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </section>
                </section>
            </div>
        </DashboardNavigation>
    );
}

export default DashboardFindPartners;