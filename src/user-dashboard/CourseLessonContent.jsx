import React, { useState, useEffect } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { generateSlug } from '../utils/slugUtils';

import { handleCourseLessonCompletion } from '../utils/coursesUtils';

function CourseLessonContent() {
    const location = useLocation();
    const navigate = useNavigate();
    const { lesson, course, module, currentLessonIndex, allLessons } = location.state || {};
    const [completionStatus, setCompletionStatus] = useState(undefined)
    const [isLoading, setIsLoading] = useState(false)

    // Navigation handlers
    const handlePrevious = () => {
        if (currentLessonIndex > 0) {
            const previousLesson = allLessons[currentLessonIndex - 1];
            navigate(`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}/${generateSlug(module.module_title, module.module_description)}/${generateSlug(previousLesson.lesson_description)}`, {
                state: {
                    lesson: previousLesson,
                    course,
                    module,
                    currentLessonIndex: currentLessonIndex - 1,
                    allLessons
                }
            });
        }
    };

    const handleNext = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentLessonIndex + 1];
            navigate(`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}/${generateSlug(module.module_title, module.module_description)}/${generateSlug(nextLesson.lesson_description)}`, {
                state: {
                    lesson: nextLesson,
                    course,
                    module,
                    currentLessonIndex: currentLessonIndex + 1,
                    allLessons
                }
            });
        }
    };

    useEffect(() => {
        if (lesson) {
            setIsLoading(true); 
            handleCourseLessonCompletion(
                lesson.id,
                'GET',
                {},
                (data) => {
                    setCompletionStatus(data.completed === true);
                    setIsLoading(false); 
                },
                (err) => {
                    console.error('Error checking completion:', err);
                    setIsLoading(false); 
                }
            );
        }
    }, [lesson]);

    const handleMarkLessonComplete = () => {
        if (lesson) {
            setIsLoading(true); 
            handleCourseLessonCompletion(
                lesson.id,
                'POST',
                { lesson: lesson.id },
                (data) => {
                    setCompletionStatus(data.completed === true);
                    setIsLoading(false); 
                },
                (err) => {
                    console.error('Error toggling completion:', err);
                    setIsLoading(false); 
                }
            );
        }
    };




    const handleComplete = () => {
        if (currentLessonIndex < allLessons.length - 1) {
            handleNext();
        } else {
            navigate(-1);
        }
    };

    // Check if navigation buttons should be disabled
    const isPreviousDisabled = currentLessonIndex === 0;
    const isNextDisabled = currentLessonIndex === allLessons.length - 1;

    return (
        <DashboardNavigation>
            <div>
                <section>
                    <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C] mb-3'>
                        Lesson {lesson.lesson_number}:<span className='text-[#E3E0C0] '> {lesson.lesson_description}</span>
                    </h1>
                    <section className='flex flex-col justify-left gap-3 md:gap-12 items-center py-7'>

                        <div className='flex flex-col gap-4 w-full min-h-[65vh] bg-[#1B1C1D] border-l-[5px] rounded-l-[20px] p-6'>

                            {/* Video Lesson Component */}
                            {lesson.lesson_type === 'video' && (
                                <div className="border-[#000000]">
                                    <div className="flex flex-col gap-6">
                                        <div className="aspect-w-16 aspect-h-9">
                                            <video
                                                className="w-full rounded-r-[15px] md:rounded-r-[20px] shadow-xl"
                                                autoPlay={true}
                                                controls
                                                muted
                                            >
                                                <source src={lesson.lesson_file_url} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div className="text-[#E3E0C0]">
                                            <p className="text-xl mb-2 text-[#FBEC6C]">Lesson Transcript</p>
                                            <p>
                                                {lesson.lesson_transcript
                                                    ? lesson.lesson_transcript
                                                    : "No transcript available for this lesson"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Audio Lesson Component */}
                            {lesson.lesson_type === 'audio' && (
                                <div className="border-[#000000]">
                                    <div className="flex flex-col gap-6">
                                        <div className="aspect-w-16">
                                            <audio
                                                className="w-full md:rounded-r-[5px] shadow-xl"
                                                autoPlay={true}
                                                controls
                                                muted={false}
                                            >
                                                <source src={lesson.lesson_file_url} type="audio/mpeg" />
                                                Your browser does not support the audio element.
                                            </audio>
                                        </div>
                                        <div className="text-[#E3E0C0]">
                                            <p className="text-xl mb-2 text-[#FBEC6C]">Lesson Transcript</p>
                                            <p>
                                                {lesson.lesson_transcript
                                                    ? lesson.lesson_transcript
                                                    : "No transcript available for this lesson"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Reading Lesson Component  */}
                            {lesson.lesson_type === 'read' && (
                                <div className="border-[#000000]">
                                    <div className="flex flex-col gap-6">
                                        <div className="text-[#E3E0C0]">
                                            <div className="prose max-w-none text-[#E3E0C0]">
                                                <p style={{ whiteSpace: 'pre-wrap' }} className='leading-7'>
                                                    {lesson.lesson_content || 'No content available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quiz Lesson Component */}
                            {lesson.lesson_type === 'quiz' && (
                                <div className="border-[#000000]">
                                    <h1>Quiz</h1>
                                    <div className="flex flex-col gap-6">
                                        <div className="text-[#E3E0C0]">
                                            <div className="prose max-w-none text-[#E3E0C0]">
                                                <p style={{ whiteSpace: 'pre-wrap' }} className='leading-7'>
                                                    {lesson.lesson_content || 'No content available'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation buttons */}
                            <div className='flex flex-col md:flex-row md:justify-between mt-5 mb-5 gap-4'>
                                <div>
                                    {
                                        !isPreviousDisabled && (
                                            <button
                                                onClick={handlePrevious}
                                                disabled={isPreviousDisabled}
                                                className=''
                                            >
                                                <FontAwesomeIcon icon={faArrowLeft} /> Previous
                                            </button>
                                        )
                                    }

                                </div>

                                <div>
                                    <button
                                        onClick={handleMarkLessonComplete}
                                        className={`px-4 rounded-md transition-colors ${isLoading
                                                ? 'bg-gray-300 cursor-not-allowed':''
                                            }`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center gap-2">
                                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="#FBEC6C" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#FBEC6C" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                ...
                                            </span>
                                        ) : completionStatus ? (
                                            "Completed"
                                        ) : (
                                            <>
                                                Complete <FontAwesomeIcon icon={faCheck} />
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div>
                                    {!isNextDisabled && (
                                        <button
                                            onClick={handleNext}
                                            disabled={isNextDisabled}
                                            className=''
                                        >
                                            Next
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </button>
                                    )
                                    }

                                </div>
                            </div>

                            <div className="text-center text-[#FBEC6C] text-sm">
                                Lesson {currentLessonIndex + 1} of {allLessons.length}
                            </div>
                        </div>

                    </section>
                </section>

            </div>
        </DashboardNavigation>
    );
}

export default CourseLessonContent;