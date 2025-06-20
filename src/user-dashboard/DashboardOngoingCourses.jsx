import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import beginnerLanguage from '../assets/dashboard-images/beginner-level.jpg';
import intermediateLanguage from '../assets/dashboard-images/intermediate-level.jpg';
import advancedLanguage from '../assets/dashboard-images/advanced-level.jpg';

import { useLocation } from 'react-router-dom';

import { generateSlug } from '../utils/slugUtils';

function DashboardOngoingCourses() {
    const location = useLocation();
    const ongoingCourses = location.state?.ongoingCourses;

  return (
    <DashboardNavigation>
      <div>
        <section>

          <h1 className='text-2xl md:text-4xl font-semibold'>Ongoing courses </h1>
          <section className='flex flex-row flex-wrap justify-left gap-3 md:gap-12 items-center py-7'>

            {ongoingCourses.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>You have no ongoing courses</p>
              </div>
            ) : (

              ongoingCourses.map((course, index) => (
                <div key={index} className=' min-h-[250px] w-[10rem] md:w-[20%]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
                  <div className='flex flex-col items-start text-left gap-2 p-3'>
                    <img src={
                      course.course_level === 'beginner'
                        ? beginnerLanguage
                        : course.course_level === 'intermediate'
                          ? intermediateLanguage
                          : advancedLanguage
                    }
                      alt={course.course_level} className='h-25 w-full rounded-t-2xl object-cover' />
                    <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{course.course_name.course_name}</p>
                    <hr className='text-white w-[100%]' />
                    <p className='text-[#FBEC6C] first-letter:uppercase'>{course.course_level}</p>
                    <p className='text-white text-[12px]'>Enrolled on {new Date(course.enrolment_date).toLocaleDateString()}</p>
                    <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}`} state={{ course }}>
                      <button className='hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                        Continue Learning
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

export default DashboardOngoingCourses;