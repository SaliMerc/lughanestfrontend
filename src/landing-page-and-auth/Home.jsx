import React, { useState, useEffect } from 'react';

import { Fade, Zoom, Slide } from 'react-awesome-reveal';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom';

import heroImageItem from '../assets/hero-second-image-light.png';

import overallHeadingIcon from '../assets/overall-heading-image-item.svg';

import aboutAccessIcon from '../assets/accessibility.svg';
import aboutCommunityIcon from '../assets/community.svg';
import aboutProgressIcon from '../assets/progress.svg';

import pricingFree from '../assets/pricing-free.svg';
import pricingPremiumMonth from '../assets/pricing-premium-month.svg';
import pricingPremiumYear from '../assets/pricing-premium-year.svg';

import contactEmail from '../assets/my-email.svg';
import contactPhone from '../assets/my-phone.svg';

import contactTwitter from '../assets/my-twitter.svg';
import contactTiktok from '../assets/my-tiktok.svg';
import contactFacebook from '../assets/my-facebook.svg';
import contactInstagram from '../assets/mi-instagram.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';

import { handleCourseItemsData } from '../utils/coursesUtils';
import { handleSubscriptiontemsData } from '../utils/paymentUtils.js';

function Home() {
  const location = useLocation();

  // For the sections
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // Data for rendering the available courses
  const [courses, setCourseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [monthlySubscription, setMonthlySubscription] = useState('');
  const [yearlySubscription, setYearlySubscription] = useState('');
  const [currency, setCurrency] = useState('');


  // fetching the available courses
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

  // fetching the subscription plans
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        await handleSubscriptiontemsData(
          {},
          (response) => {
            if (response.data) {
              setMonthlySubscription(response.data.monthly_plan);
              setYearlySubscription(response.data.yearly_plan);
              setCurrency(response.data.currency);
            } else {
              setMonthlySubscription('700');
              setYearlySubscription('8000');
              setMonthlyCurrency('Ksh.');
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

    fetchSubscriptions();
  }, []);



  return (
    <>
      <Header />
      <div className='text-white md:pt-30'>

        {/* hero section starts here */}
        <section className="hero-section flex flex-col md:flex-row  justify-between p-5 md:p-10">
          <div className="flex flex-col items-start justify-center pr-2">
            <Fade direction='left'>
              <h1 className='text-5xl md:text-[3.5rem] leading-normal font-bold mb-5'>Learn Kenyan  Languages <br className="hidden md:block" />with LughaNest </h1></Fade>
            <Link to="/signup"><button className='!min-w-50 min-h-14 px-3 !bg-[var(--main-buttons-bg)] !text-[var(--main-buttons-text)] hover:!bg-[var(--main-buttons-hover-bg)] hover:!text-[var(--main-buttons-hover-text)] shadow-xl !shadow-[#000000] text-xl font-bold !border-1 !border-[#FBEC6C] transition-colors !duration-300 text-center '>
              Get Started
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img src={heroImageItem} alt="Students learning" className='w-full h-auto mt-5 md:mt-0' />
          </div>
        </section>
        {/* hero section ends here */}
        {/* why choose us section starts */}
        <section className='mt-6 md:mt-8' id='about'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <Fade direction="up">
              <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Why Choose Us </h2>
            </Fade>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
          </div>
          <Fade direction='up'>
            <div className='flex flex-col md:flex-row justify-center gap-8 items-center md:items-start md:justify-between'>
              <div className={`h-[10rem] md:h-[17rem] w-[20rem] flex flex-col justify-center items-center text-center gap-12 rounded-[20px] bg-[var(--card-bg)]`}>
                <img src={aboutAccessIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
                <p className='text-[1.2rem] md:text-[1.5rem]'>Simple and <br />Accessible Interface</p>
              </div>

              <div>
                <p className='mb-10 mt-4 md:mt-0 text-center'>LEARN THE LANGUAGES FROM THOSE <br /> WHO LIVE THE CULTURE</p>
                <div className='h-[10rem] md:h-[17rem] w-[20rem] bg-[var(--card-bg)] flex flex-col justify-center items-center text-center gap-12 rounded-[20px]'>
                  <img src={aboutCommunityIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
                  <p className='text-[1.2rem] md:text-[1.5rem]'>Learn With a <br /> Community</p>
                </div>
              </div>

              <div className='h-[10rem] md:h-[17rem] w-[20rem] bg-[var(--card-bg)] flex flex-col justify-center items-center text-center gap-12 rounded-[20px]'>
                <img src={aboutProgressIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
                <p className='text-[1.2rem] md:text-[1.5rem]'>Track your Progress</p>
              </div>
            </div>
          </Fade>
        </section>
        {/* why choose us section ends */}

        {/* pricing section starts */}
        <section className='mt-6 md:mt-8' id='pricing'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <Fade direction='up'>
              <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Pricing</h2>
            </Fade>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>START FREE WITH ONE COURSE—UNLOCK EVERYTHING LATER!</p>
          </div>

          <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-12 items-center bg-[var(--payment-main-bg)] min-h-[40rem] py-5'>
            <Fade direction='right'>
              <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[var(--payment)] flex flex-col justify-center items-center text-center gap-18 rounded-[20px]'>
                <div className='flex flex-col items-center gap-2'>
                  <p>FREE</p>
                  <img src={pricingFree} alt="about-image" className='h-[30px] md:h-[40px]' />
                  <p className='text-[1.2rem] md:text-[1.5rem]'>Kshs. 0.00/month</p>
                </div>
                <div className='flex flex-col items-start text-left gap-2'>
                  <p><FontAwesomeIcon icon={faCheck} />  1 Full Course</p>
                  <p><FontAwesomeIcon icon={faCheck} />  Basic Dashboard</p>
                  <p><FontAwesomeIcon icon={faXmark} />  No chats</p>
                  <Link to="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                    Start Free
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  </Link>
                </div>
              </div>
            </Fade>

            <Fade direction='right'>
              <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[var(--payment-bg)] flex flex-col justify-center items-center text-center gap-18 rounded-[20px]'>
                <div className='flex flex-col items-center gap-2'>
                  <p>PREMIUM</p>
                  <img src={pricingPremiumMonth} alt="about-image" className='h-[30px] md:h-[40px]' />
                  <p className='text-[1.2rem] md:text-[1.5rem]'>{currency || "Kshs."} {monthlySubscription || "700"}/month</p>
                </div>
                <div className='flex flex-col items-start text-left gap-2'>
                  <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                  <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                  <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                  <Link to="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                    Popular
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  </Link>
                </div>
              </div>
            </Fade>

            <Fade direction='right'>
              <div className='h-[400px] md:h-[550px] w-[18rem] md:w-[20rem] bg-[var(--payment)] flex flex-col justify-center items-center text-center gap-18 rounded-[20px]'>
                <div className='flex flex-col items-center gap-2'>
                  <p>PREMIUM</p>
                  <img src={pricingPremiumYear} alt="about-image" className='h-[30px] md:h-[40px]' />
                  <p className='text-[1.2rem] md:text-[1.5rem]'>{currency || "Kshs."} {yearlySubscription || '8000'}/year</p>
                </div>
                <div className='flex flex-col items-start text-left gap-2'>
                  <p><FontAwesomeIcon icon={faCheck} />  All Courses</p>
                  <p><FontAwesomeIcon icon={faCheck} />  Full Dashboard</p>
                  <p><FontAwesomeIcon icon={faCheck} />  Live chats</p>
                  <Link to="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] shadow-xl !shadow-[#000000] text-xl  !border-1 !border-[#FBEC6C]  hover:!text-[#0E0D0C] transition-colors !duration-300'>
                    Save 37.5%
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                  </Link>
                </div>
              </div>
            </Fade>
          </div>

        </section>
        {/* pricing section ends */}

        {/* courses section starts */}
        <section className='mt-6 md:mt-8'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Courses</h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>EXPLORE OUR COURSES—BEGIN LEARNING AT NO COST!</p>
          </div>
          <div className='flex flex-col md:flex-row justify-center gap-8 md:gap-12 items-center  py-5'>
            <Fade direction='up'>

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

                courses.slice(0, 4).map((language, index) => (
                  <div key={index} className=' min-h-[250px] w-[15rem] md:w-[16rem]  bg-[var(--card-bg)] flex flex-col justify-center items-center text-center gap-10 rounded-[20px]'>
                    <div className='flex flex-col items-start text-left gap-2'>
                      <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>{language.course_name}</p>
                      <hr className='text-white w-[100%]' />
                      <p className='text-[#FBEC6C] first-letter:uppercase'>{language.course_level}</p>
                      <Link to="/signup"><button className='min-w-36 min-h-14 px-3  shadow-xl text-xl !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                        Enroll
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </Fade>

            <Link to="/courses" className='underline'><p className=''>See All Courses <FontAwesomeIcon icon={faArrowRight} /></p></Link>
          </div>
        </section>
        {/* courses section ends */}

        {/* contact section starts */}
        <section className='mt-6 md:mt-8' id='contact'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>Contact Us</h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>GET IN TOUCH WITH US FOR ANY INQUIRIES </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-15 md:gap-52  bg-[var(--card-bg)] min-h-[10rem] w-[100%] p-8">
            <Fade direction='left'>
              <div className='flex flex-col gap-8'>
                <a className="flex flex-row gap-3">
                  <img src={contactEmail} alt="email" />
                  <div>contact@lughanest.com</div>
                </a>
                <a href='' className="flex flex-row gap-3">
                  <img src={contactPhone} alt="email" />
                  <div>+254 12345678</div>
                </a>
              </div>
            </Fade>
            <div>
              <h2 className='text-1xl md:text-2xl leading-normal font-bold mb-5'>Social Media</h2>
              <Fade direction='left'>
                <div className='flex flex-row gap-7'>
                  <a href=""><img src={contactFacebook} alt="facebook" /></a>
                  <a href=""><img src={contactTiktok} alt="facebook" /></a>
                  <a href=""><img src={contactInstagram} alt="facebook" /></a>
                  <a href=""><img src={contactTwitter} alt="facebook" /></a>
                </div>
              </Fade>
            </div>
          </div>

        </section>
        {/* contact section ends */}
      </div >
      <Footer />
    </>
  );
}
export default Home;
