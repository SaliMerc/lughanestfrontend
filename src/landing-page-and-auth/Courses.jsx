import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom';

import { handleCourseItemsData } from '../utils/coursesUtils';

import heroImage from '../assets/hero-back-color.png';

import overallHeadingIcon from '../assets/overall-heading-image-item.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Courses() {

  const [courses, setCourseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchCourses = async () => {
    try {
      setLoading(true);

      const COURSES_CACHE_KEY = 'coursesCache';
      const CACHE_EXPIRY = 30 * 60 * 1000; 
      const now = new Date().getTime();

      const cachedData = localStorage.getItem(COURSES_CACHE_KEY);

      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData);
          

          if (now - timestamp < CACHE_EXPIRY && Array.isArray(data)) {
            setCourseItems(data);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Failed to parse cached courses', e);
        }
      }
      await handleCourseItemsData(
        {},
        (response) => {
          const coursesData = Array.isArray(response?.data) ? response.data : [];
          setCourseItems(coursesData);
          
          if (Array.isArray(coursesData)) {
            localStorage.setItem(
              COURSES_CACHE_KEY,
              JSON.stringify({
                data: coursesData,
                timestamp: now
              })
            );
          }
        },
        (error) => {
          setError(error.message || 'Failed to fetch courses');
          setCourseItems([]); 
        }
      );
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setCourseItems([]); 
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);

  return (
    <>
      <Header />
      <div className='text-white min-h-screen md:pt-20'>
        {/* courses section starts */}
        <section className='mt-6 md:mt-8'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Courses</h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>EXPLORE OUR COURSES—BEGIN LEARNING AT NO COST!</p>
          </div>
          <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center  py-5'>

            {loading ? (

              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                <p className="mt-4">Loading courses...</p>
              </div>

            ) : courses.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>No courses available at the moment.</p>
              </div>
            ) : (

              courses.map((language, index) => (
                <div key={index} className=' min-h-[250px] w-[15rem] md:w-[16rem]  bg-[var(--card-bg)] flex flex-col justify-center items-center text-center gap-10 rounded-[20px]'>
                  <div className='flex flex-col items-start text-left gap-2'>
                    <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{language.course_name}</p>
                    <hr className='text-white w-[100%]' />
                    <p className='text-[#FBEC6C] first-letter:uppercase'>{language.course_level}</p>
                    <a href="/signup"><button className='min-w-36 min-h-14 px-3  shadow-xl text-xl !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                      Enroll
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    </a>
                  </div>
                </div>
              ))
            )}

          </div>
        </section>
        {/* courses section ends */}
      </div >
      <Footer />
    </>
  );
}
export default Courses;
