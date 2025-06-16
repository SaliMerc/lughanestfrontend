import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


function CourseLessons() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    return (
        <DashboardNavigation>
            <div>
                <section>
                    <Link to='/ongoing-courses'>
                        <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C]'>Dholuo- <span className='text-[#E3E0C0]'>Greetings and Introduction</span></h1>
                    </Link>
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
                           
                                <div className='flex flex-col md:flex-row gap-6 md:justify-between items-start text-left gap-2 p-3'>
                                    <div>
                                        <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase text-[#FBEC6C] mb-3 font-semibold'>Lesson 1:</p>
                                        <p className='first-letter:uppercase'>Basic greetings (Hello, how're you) </p>
                                    </div>
                                    <div>
                                        <p className='text-[1rem] md:text-[1.5rem] first-letter:uppercase  mb-3 font-semibold'>Video</p>
                                        <p className='first-letter:uppercase text-[#FBEC6C]'>10mins</p>
                                    </div>
                                    <div>
                                        <Link to="/dashboard-courses/course-modules">
                                            <button className='w-[10px] min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[13px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                                Watch
                                            </button>
                                        </Link>
                                    </div>
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

export default CourseLessons;