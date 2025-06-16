import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useLocation, useNavigate } from 'react-router-dom';

import DashboardNavigation from './DashboardHeader';

function DashboardBlogContent() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state || {};

  return (
    <>
     <DashboardNavigation>
      <div className='text-white min-h-screen md:pt-20'>
        <section className='mt-6 md:mt-8'>
         
            <div className='flex flex-col justify-left items-left mb-5 md:px-5'>
              <h2 className='text-2xl md:text-4xl leading-normal font-bold mb-5'>{blog.blog_title}</h2>
              <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center py-5'>
                <div className='min-h-[250px] w-full bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-10 rounded-[20px] p-4 md:p-6'>
                  <img
                    src={blog.blog_image_url || require('../assets/blog-image-placeholder.jpg')}
                    alt="Blog"
                    className='w-[90%] md:h-[550px] mt-5 md:mt-0 rounded-2xl object-cover'
                  />
                  <div className='flex flex-col items-left text-left gap-2 w-[90%]'>
                    <p className='text-[#FBEC6C] text-[16px]'>
                      By {blog.blog_author} on {new Date(blog.created_at).toLocaleDateString()}
                    </p>
                    <hr className='text-white w-full' />
                    <p style={{ whiteSpace: 'pre-wrap' }} className='leading-7'>{blog.blog_content}</p>
                  </div>
                </div>
              </div>
            </div>
        </section>
      </div>
        </DashboardNavigation>
    </>
  );
}

export default DashboardBlogContent;
