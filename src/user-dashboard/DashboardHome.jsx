import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { handleEnrolledCourses } from '../utils/coursesUtils';

import beginnerLanguage from '../assets/dashboard-images/beginner-level.jpg';
import intermediateLanguage from '../assets/dashboard-images/intermediate-level.jpg';
import advancedLanguage from '../assets/dashboard-images/advanced-level.jpg';

import WeeklyLineChart from '../components/LineChart';
import MonthlyBarChart from '../components/BarChart';


import { generateSlug } from '../utils/slugUtils';

function DashboardHome() {
  const defaultWeeklyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const defaultWeeklyData = [0, 0, 0, 0, 0, 0, 0];

  const defaultMonthlyLabels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const defaultMonthlyData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [weekly_lessons_data, setWeeklyLessons] = useState(defaultWeeklyData);
  const [weekly_labels, setWeeklyLabels] = useState(defaultWeeklyLabels);
  const [lessons_by_month_data, setMonthlyLessons] = useState(defaultMonthlyData);
  const [monthly_common_labels, setMonthlyLabels] = useState(defaultMonthlyLabels);


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

              setWeeklyLessons(response.data.weekly_lessons_data);
              setWeeklyLabels(response.data.weekly_labels);

              setMonthlyLessons(response.data.lessons_by_month_data);
              setMonthlyLabels(response.data.monthly_common_labels);
            } else {
              setOngoingCourses([]);
              setCompletedCourses([]);

              setWeeklyLessons([]);
              setWeeklyLabels([]);

              setMonthlyLessons([]);
              setMonthlyLabels([]);
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

              ongoingCourses.slice(0,4).map((course, index) => (
                <div key={index} className=' min-h-[250px] w-[10rem] md:w-[18rem]  bg-[var(--dashboard-card-bg)]  flex flex-col gap-10 rounded-[20px]'>
                  <div className='flex flex-col items-start text-left gap-2 p-3'>
                    <img src={
                      course.course_level === 'beginner'
                        ? beginnerLanguage
                        : course.course_level === 'intermediate'
                          ? intermediateLanguage
                          : advancedLanguage
                    }
                      alt={course.course_level} className='h-25 w-full rounded-t-2xl object-cover' />
                    <div className=''>

                      <div className=''>
                        <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{course.course_name.course_name}</p>

                        <p className='!text-[var(--chart-lines)] border rounded-lg px-2'>{Math.round(course.course_progress)}% Done</p>
                      
                      </div>                      

                    </div>
                    <hr className='text-white w-[100%]' />
                    <p className='text-[#FBEC6C] first-letter:uppercase'>{course.course_level}</p>
                    <p className='text-white text-[12px]'>Enrolled on {new Date(course.enrolment_date).toLocaleDateString()}</p>
                    <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}`} state={{ course:course.course_name, course_id:course.course_name.id }}>
                      <button className='!w-[8.2rem] md:!w-[16rem] !text-[0.8rem] md:!text-[1.2rem] shadow-xl !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] hover:!text-[#0E0D0C] transition-colors !duration-300'>
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
          <div className='bg-[var(--dashboard-card-bg)] w-full h-[300px] md:w-[600px] md:h-[450px] text-center text-white p-5'>
            <WeeklyLineChart
              weeklyData={weekly_lessons_data}
              weeklyLabels={weekly_labels}
            />
          </div>
          <div className='bg-[var(--dashboard-card-bg)] w-full h-[300px] md:w-[600px] md:h-[450px] text-center text-white p-5'>
            <MonthlyBarChart
              yearlyData={lessons_by_month_data}
              yearlyLabels={monthly_common_labels}
            />
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
                <div key={index} className=' min-h-[250px] w-[10rem] md:w-[18rem]  bg-[var(--dashboard-card-bg)]  flex flex-col gap-10 rounded-[20px]'>
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
                    <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}`} state={{ course:course.course_name, course_id:course.course_name.id }}>
                      <button className='!w-[8.2rem] md:!w-[16rem] !text-[0.8rem] md:!text-[1.2rem] shadow-xl !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] hover:!text-[#0E0D0C] transition-colors !duration-300'>
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