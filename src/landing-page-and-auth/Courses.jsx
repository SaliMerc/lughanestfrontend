import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom';

import heroImage from '../assets/hero-back-color.png';

import overallHeadingIcon from '../assets/overall-heading-image.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Courses() {

  // fake data for rendering the courses 
  const courses = [
  {
    id: 1,
    title: "Kiswahili",
    level: "Beginner",
    description: "Kenya's national language and East Africa's lingua franca"
  },
  {
    id: 2,
    title: "Dholuo",
    level: "Beginner",
    description: "Language of the Luo community around Lake Victoria"
  },
  {
    id: 3,
    title: "Kikuyu (Gĩkũyũ)",
    level: "Intermediate",
    description: "Language of Kenya's largest ethnic group"
  },
  {
    id: 4,
    title: "Kamba (Kikamba)",
    level: "Beginner",
    description: "Language of the Ukambani region"
  },
  {
    id: 5,
    title: "Luhya (Luluhya)",
    level: "Intermediate",
    description: "Learn the western Kenya language with many dialects"
  },
  {
    id: 6,
    title: "Kalenjin",
    level: "Beginner",
    description: "Language of the Rift Valley communities"
  },
  {
    id: 7,
    title: "Meru (Kĩmĩĩrũ)",
    level: "Intermediate",
    description: "Language of the Meru people in Eastern Kenya"
  },
  {
    id: 8,
    title: "Kisii (Ekegusii)",
    level: "Beginner",
    description: "Language of the Abagusii community"
  },
  {
    id: 9,
    title: "Maa (Samburu/Maasai)",
    level: "Advanced",
    description: "Learn the pastoralist language of northern Kenya"
  },
  {
    id: 10,
    title: "Taita (Kidawida)",
    level: "Beginner",
    description: "Language of the Taita people in coastal Kenya"
  }
];

  return (
    <>
      <Header />
      <div className='text-white min-h-screen'>
        {/* courses section starts */}
        <section className='mt-6 md:mt-8'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Courses</h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>EXPLORE OUR COURSES—BEGIN LEARNING AT NO COST!</p>
          </div>
          <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center  py-5'>
            {courses.map((language) => (
            <div key={language.id} className=' min-h-[250px] w-full sm:w-[45%] md:w-[23%] bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-10 rounded-[20px]'>
              <div className='flex flex-col items-start text-left gap-2'>
                <p className='text-[1.2rem] md:text-[1.5rem]'>{language.title}</p>
                <hr className='text-white w-[100%]' />
                <p className='text-[#FBEC6C]'>{language.level}</p>
                <a href="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                  Enroll
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
                </a>
              </div>
            </div>
             ))}

          </div>
        </section>
        {/* courses section ends */}
      </div >
      <Footer />
    </>
  );
}
export default Courses;
