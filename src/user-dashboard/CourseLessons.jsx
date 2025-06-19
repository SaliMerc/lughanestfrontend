import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { generateSlug } from '../utils/slugUtils';

function CourseLessons() {
    const location = useLocation();
    const navigate = useNavigate();
    const { course, module } = location.state || {};
    const [lessons, setLessons] = useState(module.module_lessons)

    return (
        <DashboardNavigation>
            <div>
                <section>
                    <Link to='/ongoing-courses'>
                        <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C]'>{course.course_name.course_name}- <span className='text-[#E3E0C0]'>{module.module_title}</span></h1>
                    </Link>
                    <section className='flex flex-col justify-left gap-3 md:gap-12 items-center py-7'>

                        {module.module_lessons.length === 0 ? (

                            <div className="w-full text-center py-10">
                                <p>No lessons available for this module</p>
                            </div>
                        ) : (

                            module.module_lessons.map((lesson, index) => (
                                <div key={index} className=' min-h-[100px] w-[100%] bg-[#0E0D0C]  flex flex-col gap-10 rounded-[20px]'>

                                    <div className='flex flex-col md:flex-row gap-6 md:justify-between items-start text-left p-3'>
                                        <div>
                                            <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase text-[#FBEC6C] mb-3 font-semibold'>Lesson {lesson.lesson_number}:</p>
                                            <p className='first-letter:uppercase'>{lesson.lesson_description} </p>
                                        </div>
                                        <div>
                                            <p className='text-[1rem] md:text-[1.5rem] first-letter:uppercase  mb-3 font-semibold'>{lesson.lesson_type}</p>
                                            <p className='first-letter:uppercase text-[#FBEC6C]'>{lesson.lesson_duration} minutes</p>
                                        </div>
                                        <div>
                                            <Link to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}/${generateSlug(module.module_title,module.module_description)}/${generateSlug(lesson.lesson_description)}`} 
                                                  state={{
                                                      lesson,
                                                      course,
                                                      module,
                                                      currentLessonIndex: index,
                                                      allLessons: module.module_lessons
                                                  }}>
                                                <button className='w-[10px] min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] !text-[13px] md:!text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                                                    {lesson.lesson_type === 'video' && 'Watch'}
                                                    {lesson.lesson_type === 'audio' && 'Listen'}
                                                    {lesson.lesson_type === 'read' && 'Read'}
                                                    {lesson.lesson_type === 'quiz' && 'Take Quiz'}
                                                </button>
                                            </Link>
                                        </div>
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

export default CourseLessons;