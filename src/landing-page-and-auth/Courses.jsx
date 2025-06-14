import React, { useState, useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom';

import { handleCourseItemsData } from '../utils/coursesUtils';

import heroImage from '../assets/hero-back-color.png';

import overallHeadingIcon from '../assets/overall-heading-image.svg';

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
        await handleCourseItemsData(
          {},
          (response) => {
            if (response.data) {
              setCourseItems(response.data);
            } else {
              setCourseItems([]);
            }
          },
          (error) => {
            setError(error.message || 'Failed to fetch blogs');
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
                <div key={index} className=' min-h-[250px] w-full sm:w-[45%] md:w-[23%] bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-10 rounded-[20px]'>
                  <div className='flex flex-col items-start text-left gap-2'>
                    <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{language.course_name}</p>
                    <hr className='text-white w-[100%]' />
                    <p className='text-[#FBEC6C] first-letter:uppercase'>{language.course_level}</p>
                    <a href="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
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
