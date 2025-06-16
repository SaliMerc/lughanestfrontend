import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import beginnerLanguage from '../assets/dashboard-images/beginner-level.jpg';
import intermediateLanguage from '../assets/dashboard-images/intermediate-level.jpg';
import advancedLanguage from '../assets/dashboard-images/advanced-level.jpg';

import { handleStructuredCourseItemsData } from '../utils/coursesUtils';

import { generateSlug } from '../utils/slugUtils';

function DashboardCourses() {
    const [coursesByLanguage, setCoursesByLanguage] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                await handleStructuredCourseItemsData(
                    {},
                    (response) => {
                        if (response.data) {
                            setCoursesByLanguage(response.data);
                        } else {
                            setCoursesByLanguage({});
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
            <div className="p-4">
                <h1 className="text-2xl md:text-4xl font-semibold text-[#FBEC6C] mb-6">All Courses</h1>

                {loading ? (
                    <div className="w-full text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                        <p className="mt-4">Loading courses...</p>
                    </div>
                ) : error ? (
                    <div className="w-full text-center py-10 text-red-500">
                        <p>{error}</p>
                    </div>
                ) : Object.keys(coursesByLanguage).length === 0 ? (
                    <div className="w-full text-center py-10">
                        <p>No courses available at the moment.</p>
                    </div>
                ) : (
                    Object.entries(coursesByLanguage).map(([language, courseList]) => (
                        <div key={language} className="mb-10">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{language}</h2>
                            <div className="flex flex-wrap gap-4">
                                {courseList.map((course) => (
                                    <div key={course.id} className='min-h-[250px] w-[45%] md:w-[28%] bg-[#0E0D0C] flex flex-col gap-10 rounded-[20px]'>
                                        <div className='flex flex-col items-start text-left gap-2 p-3'>
                                            <img
                                                src={
                                                    course.course_level === 'beginner'
                                                        ? beginnerLanguage
                                                        : course.course_level === 'intermediate'
                                                            ? intermediateLanguage
                                                            : advancedLanguage
                                                }
                                                alt={course.course_level}
                                                className='h-25 w-full rounded-t-2xl object-cover'
                                            />
                                            <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase'>
                                                {course.course_name}
                                            </p>
                                            <hr className='text-white w-[100%]' />
                                            <p className='text-[#FBEC6C] first-letter:uppercase'>{course.course_level}</p>
                                            <p className='text-white text-[12px]'>Instructor: {course.instructor_name}</p>

                                            {course.is_enrolled ? (
                                                <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}`} state={{ course }}>
                                                    <button className='!min-w-[100%] min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[13px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                                        Go to Course
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link to={`/dashboard-courses/${generateSlug(course.course_name)}`} state={{ course }}>
                                                    <button className='!min-w-[100%] min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[13px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                                        Enroll
                                                    </button>
                                                </Link>
                                            )}

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DashboardNavigation>
    );
}

export default DashboardCourses;
