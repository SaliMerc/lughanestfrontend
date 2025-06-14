import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

import { useLocation, useNavigate } from 'react-router-dom';

import { generateSlug } from '../utils/slugUtils';

function EnrollCourses() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    const navigate = useNavigate();
    const { course } = location.state || {};

    return (
        <DashboardNavigation>

            <section
                className='form-element'
                style={{
                    backgroundImage: `url(${auth_background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: '100vh',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <div className='form-div'>
                    <div className='form-title'>
                        <div className='heading-item'><h1>Confirm Enrollment</h1></div>
                    </div>
                    <form >
                        <fieldset>
                            <legend className='font-semibold'>Language</legend>
                            <input
                                type='text'
                                required
                                name='course_name'
                                value={course.course_name}
                                readOnly
                            />
                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>Language Level</legend>
                            <input
                                type='text'
                                required
                                name='course_level'
                                value={course.course_level}
                                readOnly
                                className=''
                            />

                        </fieldset>

                        <fieldset>
                            <legend className='font-semibold'>Instructor</legend>
                            <input
                                type='text'
                                required
                                name='instructor_name'
                                value={course.instructor_name}
                                readOnly
                            />

                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5></h5>
                        </div>
                        <button type='submit'>
                            Enroll<FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </form>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default EnrollCourses;