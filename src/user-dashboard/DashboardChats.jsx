import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import profileImage from '../assets/profile-image.png';


function DashboardChats() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    return (
        <DashboardNavigation>
            <div>
                <section>
             
                        <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C]'>My Chats</h1>
                    
                    <section className='flex flex-row flex-wrap md:flex-nowrap justify-left gap-3 md:gap-12 items-center py-7'>

                        {/* {loading ? ( */}
                        {/*         
                        <div className="w-full text-center py-10">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                          <p className="mt-4">Loading courses...</p>
                        </div> */}

                        {/* ) : courses.length === 0 ? ( */}

                        {/* <div className="w-full text-center py-10">
                          <p>No courses available at the moment.</p>
                        </div> */}
                        {/* ) : (
        
                        courses.slice(0, 4).map((language, index) => ( */}
                        <div className=' min-h-[100px] w-[100%] md:w-[100%]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
                            <Link to='/dashboard-chats/chat-interface'>
                                <div className='flex flex-row items-center justify-between text-left gap-2 p-3'>
                                    <div className='flex flex-row items-center gap-4'>
                                        <div>
                                            <img
                                                src={profileImage}
                                                alt="Profile"
                                                className="rounded-full object-cover w-full h-full"
                                            />
                                        </div>
                                        <div>
                                            <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase text-[#FBEC6C] mb-3 '>Jane Doe</p>
                                            <p className='first-letter:uppercase'>Giiirlll...</p>
                                        </div>

                                    </div>
                                    <div>10:30pm</div>

                                </div>
                            </Link>
                        </div>




                        {/* ))
                      )} */}
                    </section>
                </section>

            </div>
        </DashboardNavigation>
    );
}

export default DashboardChats;