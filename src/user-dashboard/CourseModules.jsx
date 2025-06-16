import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { capitalizeFirst } from '../utils/slugUtils';

import { handleCourseModules } from '../utils/coursesUtils';

function CourseModules() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (course) {
      setLoading(true);
      handleCourseModules(
        course.course_name.id, 
        (data) => {
          setModules(data);
          setLoading(false);
        },
        (err) => {
          setError(err.message || 'Failed to load modules');
          setLoading(false);
        }
      );
    }
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
                <div key={module.id} className='min-h-[100px] w-full bg-[#0E0D0C] flex flex-col gap-3 rounded-[20px] p-6'>
                  <Link 
                    to={`/dashboard-courses/course-lessons`} 
                    state={{ module, course }}
                    className='hover:text-[#FBEC6C] transition-colors'
                  >
                    <div className='flex flex-col items-start text-left gap-2'>
                      <p className='text-[1.2rem] md:text-[1.5rem] font-semibold text-[#FBEC6C] mb-3'>
                        {module.module_title}
                      </p>
                      <p className='text-[#E3E0C0]'>
                        {module.module_description}
                      </p>
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