import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import auth_background from '../assets/login-signup-image.png';

import { useLocation, useNavigate } from 'react-router-dom';

import { generateSlug } from '../utils/slugUtils';
import { handleCourseEnrolment } from '../utils/coursesUtils';

function EnrollCourses() {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    const navigate = useNavigate();
    const { course } = location.state || {};

    // Enroll courses data handling starts here
    const [loading, setLoading] = useState('');
    const [formError, setFormError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormError('');

        setLoading(true);

        await handleCourseEnrolment({
            course_name_id: course.id,
            course_level: course.course_level,
            is_enrolled: true
        },
            (response) => {
                setLoading(false);
                if (response.data.message.includes("You have successfully enrolled in this course")) {
                    navigate('/dashboard-home');
                }
                else {
                    setFormError(response.data.message)
                }
            },
            (error) => {
                console.error("Enrollment error:", error);
                setLoading(false);

                const errorData = error?.response?.data;

                if (errorData) {
                    setFormError(errorData.message)

                } else {

                    setFormError("Enrollment failed.");
                }
            }
        );
    };
    // Enroll courses data handling ends here

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
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className='font-semibold'>Language</legend>
                            <input
                                type='text'
                                required
                                name='course_name'
                                value={course.course_name}
                                readOnly
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                            />

                        </fieldset>
                        <div className="form-header-items flex justify-between items-center my-0 mx-2 text-red-700">
                            <h5>{formError}</h5>
                        </div>
                        <button type='submit'>
                            {loading ? "Enrolling..." : "Enroll"}
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </form>
                </div>

            </section >

        </DashboardNavigation>
    );
}

export default EnrollCourses;