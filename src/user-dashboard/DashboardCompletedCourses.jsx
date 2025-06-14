import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import beginnerLanguage from '../assets/dashboard-images/beginner-level.jpg';
import intermediateLanguage from '../assets/dashboard-images/intermediate-level.jpg';
import advancedLanguage from '../assets/dashboard-images/advanced-level.jpg';


function DashboardCompletedCourses() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    return (
        <DashboardNavigation>
            <div>
                <section className='mt-10'>

                    <h1 className='text-2xl md:text-4xl font-semibold'>Completed courses</h1>

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
                        <div className=' min-h-[250px] w-[10rem] md:w-[18rem]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
                            <div className='flex flex-col items-start text-left gap-2 p-3'>
                                <img src={beginnerLanguage} alt="Beginner" className='h-25 w-full rounded-t-2xl object-cover' />
                                <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>Kiswahili</p>
                                <hr className='text-white w-[100%]' />
                                <p className='text-[#FBEC6C] first-letter:uppercase'>Beginner</p>
                                <p className='text-white text-[12px]'>Enrolled on 10/5/2019</p>
                                <p className='text-white text-[12px]'>Compeleted on 10/5/2019</p>
                                <Link to="/signup">
                                    <button className='!min-w-[36px] min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[13px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                        Review
                                    </button>
                                </Link>
                            </div>
                        </div>



                        {/* ))
                      )} */}
                    </section>
                </section>
            </div>
        </DashboardNavigation>
    );
}

export default DashboardCompletedCourses;