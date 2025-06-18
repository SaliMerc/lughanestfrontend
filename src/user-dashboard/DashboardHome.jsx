import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { handleEnrolledCourses } from '../utils/coursesUtils';

import beginnerLanguage from '../assets/dashboard-images/beginner-level.jpg';
import intermediateLanguage from '../assets/dashboard-images/intermediate-level.jpg';
import advancedLanguage from '../assets/dashboard-images/advanced-level.jpg';


import { generateSlug } from '../utils/slugUtils';

function DashboardHome() {
  const [ongoingCourses, setOngoingCourses] = useState({});
  const [completedCourses, setCompletedCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        await handleEnrolledCourses(
          {},
          (response) => {
            if (response.data) {
              setOngoingCourses(response.data.ongoing_courses);
              setCompletedCourses(response.data.completed_courses);
            } else {
              setOngoingCourses({});
              setCompletedCourses({});
            }
          },
          (error) => {
            setError(error.message || 'Failed to fetch courses');
          }
        );
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <DashboardNavigation>
      <div>
        <section>
          <Link to='/ongoing-courses' state={{ ongoingCourses: ongoingCourses }}>
            <h1 className='text-2xl md:text-4xl font-semibold'>Ongoing courses <FontAwesomeIcon icon={faArrowRight} /></h1>
          </Link>
          <section className='flex flex-row flex-wrap md:flex-nowrap justify-left gap-3 md:gap-12 items-center py-7'>

            {loading ? (

              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                <p className="mt-4">Loading ongoing courses...</p>
              </div>

            ) : ongoingCourses.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>You have no ongoing courses.</p>
              </div>
            ) : (

              ongoingCourses.slice(0, 4).map((course, index) => (
                <div key={index} className=' min-h-[250px] w-[10rem] md:w-[18rem]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
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

        {/* Charts section starts */}
        <h1 className='text-2xl md:text-4xl font-semibold mb-12'>My Learning Charts</h1>
        <section className='flex flex-col md:flex-row gap-12 md:gap-24'>
          <div className='bg-[#0E0D0C] w-full h-[300px] md:w-[600px] md:h-[450px] text-center text-white p-5'>
            <h1>Line chart goes here</h1>
          </div>
          <div className='bg-[#0E0D0C] w-full h-[300px] md:w-[600px] md:h-[450px] text-center text-white p-5'>
            <h1>Bar chart goes here</h1>
          </div>
        </section>
        {/* charts section ends */}

        <section className='mt-10'>
          <Link to='/completed-courses' state={{ completedCourses: completedCourses }}>
            <h1 className='text-2xl md:text-4xl font-semibold'>Completed courses <FontAwesomeIcon icon={faArrowRight} /></h1>
          </Link>
          <section className='flex flex-row flex-wrap md:flex-nowrap justify-left gap-3 md:gap-12 items-center py-7'>

            {loading ? (

              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                <p className="mt-4">Loading completed courses...</p>
              </div>

            ) : completedCourses.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>You have not completed any courses.</p>
              </div>
            ) : (

              completedCourses.slice(0, 4).map((course, index) => (
                <div key={index} className=' min-h-[250px] w-[10rem] md:w-[18rem]  bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>
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
                    <p className='text-white text-[12px]'>Compeleted on {new Date(course.completion_date).toLocaleDateString()}</p>
                    <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}`} state={{ course }}>
                      <button className='hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                        Review
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

export default DashboardHome;