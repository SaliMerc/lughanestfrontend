import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { generateSlug } from '../utils/slugUtils';
import { handleFindPartners } from '../utils/chatUtils';
import { capitalizeFirst } from '../utils/slugUtils';

import profileImage from '../assets/dashboard-images/profile-pic-placeholder.png';

function DashboardFindPartners() {
    const [partners, setPartners] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true);
                const response = await handleFindPartners();
                console.log("API Response:", response);

                if (response) {
                    setPartners(response.data);
                } else {
                    setPartners([]);
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

    return (
        <DashboardNavigation>
            <div>
                <section>

                    <h1 className='text-2xl md:text-4xl font-semibold'>Find Partners </h1>
                    <section className='flex flex-row flex-wrap justify-left gap-3 md:gap-12 items-center py-7'>

                        {loading ? (

                            <div className="w-full text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                                <p className="mt-4">Loading partners...</p>
                            </div>

                        ) :

                            partners.length === 0 ? (

                                <div className="w-full text-center py-10">
                                    <p>No partners to show</p>
                                </div>
                            )
                                : (

                                    partners.map((partners, index) => (
                                        <div key={index} className=' min-h-[250px] w-[10rem] md:w-[20%]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
                                            <div className='flex flex-col items-start text-left gap-2 p-3'>
                                                <div className='flex flex-row items-center gap-3'>
                                                    <div className='w-10 h-10 md:w-15 md:h-15 mr-4'>
                                                    <img src={profileImage} alt="Profile Picture" className='rounded-full object-cover w-full h-full' />
                                                </div>
                                                <div>
                                                    <p>{capitalizeFirst(partners.display_name)}</p>
                                                </div>
                                                </div>
                                                
                                                <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{partners.display_name}</p>
                                                <hr className='text-white w-[100%]' />
                                                <p className='text-[#FBEC6C] first-letter:uppercase'>{partners.courses.course_name}</p>
                                                <Link to={`/dashboard-chats/chat-interface/${generateSlug(partners.display_name)}`}>
                                                    <button className='hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                                        Message
                                                    </button>
                                                </Link>
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