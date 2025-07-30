import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { capitalizeFirst } from '../utils/slugUtils';

import { handleCourseModules } from '../utils/coursesUtils';

import { generateSlug } from '../utils/slugUtils';

function CourseModules() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!course) return;

    setLoading(true);
    handleCourseModules(
      course.course_name.id,
      (data) => {
        setModules(data);
        setLoading(false);
        console.log(data)
      },
      (err) => {
        setError(err.message || 'Failed to load modules');
        setLoading(false);
      }
    );
  }, [course]);


  return (
    <DashboardNavigation>
      <div>
        <section>
          <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C]'>
            {course.course_name.course_name} -
            <span className='text-[#E3E0C0]'> {capitalizeFirst(course.course_level)}</span>
          </h1>

          <section className='flex flex-col gap-3 md:gap-6 py-7'>
            {loading ? (
              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                <p className="mt-4">Loading modules...</p>
              </div>
            ) : error ? (
              <div className="w-full text-center py-10">
                <p className="text-red-500">{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 text-[#FBEC6C]">
                  Try Again
                </button>
              </div>
            ) : modules.length === 0 ? (
              <div className="w-full text-center py-10">
                <p>No modules available for this course yet.</p>
              </div>
            ) : (
              modules.map((module, index) => (
                <div key={index} className='min-h-[100px] w-full bg-[var(--dashboard-card-bg)] flex flex-col gap-3 rounded-[20px] p-6'>
                  <Link
                    to={`/dashboard-home/${generateSlug(course.course_name.course_name, course.course_level)}/${generateSlug(module.module_title, module.module_description)}`}
                    state={{ module, course }}
                    className='hover:text-[#FBEC6C] transition-colors flex flex-row justify-between items-center'
                  >
                    <div className='flex flex-col items-start text-left gap-2'>
                      <p className='text-[1.2rem] md:text-[1.5rem] font-semibold text-[#FBEC6C] mb-3'>
                        {module.module_title}
                      </p>
                      <p className='text-[#E3E0C0]'>
                        {module.module_description}
                      </p>
                    </div>

                    <div>

                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-[#FBEC6C]"
                            strokeWidth="3"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                          <span className="text-[1rem] text-white">{module.modules[0].module_progress}%</span>
                        </div>
                      </div>

                    </div>
                  </Link>
                </div>
              ))
            )}
          </section>
        </section>
      </div>
    </DashboardNavigation>
  );
}

export default CourseModules;