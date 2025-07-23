import React, { useEffect, useState } from 'react';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { handleBlogItemsData } from '../utils/blogUtils';

import { Link } from 'react-router-dom';

import overallHeadingIcon from '../assets/overall-heading-image-two.svg';
import blogImage from '../assets/blog-image-placeholder.jpg';

import { generateSlug } from '../utils/slugUtils';

function Blogs() {
  const [blogItems, setBlogItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        await handleBlogItemsData(
          {},
          (response) => {
            if (response.data) {
              setBlogItems(response.data);
            } else {
              setBlogItems([]);
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

    fetchBlogs();
  }, []);

  return (
    <>
      <Header />
      <div className='text-white min-h-screen md:pt-20'>
        <section className='mt-6 md:mt-8'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>The LughaNest Journal</h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>YOUR LEARNING HUB — EXPLORE, READ, GROW</p>
          </div>
          
          <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center py-5'>
            {loading ? (

              <div className="w-full text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                <p className="mt-4">Loading blogs...</p>
              </div>

            ) : error ? (
           
              <div className="w-full text-center py-10 text-red-500">
                <p>Error: {error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-[#FBEC6C] text-[#0E0D0C] rounded hover:bg-[#E3E0C0] transition-colors flex justify-center items-center"
                >
                  Retry
                </button>
              </div>

            ) : blogItems.length === 0 ? (

              <div className="w-full text-center py-10">
                <p>No blog posts available at the moment.</p>
              </div>
            ) : (
              
              blogItems.map((blog, index) => (
                <div key={index} className='min-h-[250px] w-full sm:w-[45%] md:w-[30%] bg-[var(--card-bg)] flex flex-col justify-center items-center text-center gap-10 rounded-[20px] p-4 md:p-6'>
                  <div className='flex flex-col items-start text-left gap-2'>
                    <img src={blog.blog_image_url|| require('../assets/blog-image-placeholder.jpg')} alt="Blog" className='w-full h-auto mt-5 md:mt-0 rounded-2xl object-cover' loading='lazy' />
                    <p className='text-[1.2rem] md:text-[1.5rem]'>{blog.blog_title}</p>
                    <p className='text-[#FBEC6C] text-[13px]'>By {blog.blog_author} on {new Date(blog.created_at).toLocaleDateString()}</p>
                    <hr className='text-white w-[100%] my-5' />
                    <p>
                      {blog.blog_content.split(" ").length > 5
                        ? blog.blog_content.split(" ").slice(0, 20).join(" ") + "..."
                        : blog.blog_content}
                    </p>
                    <Link to={`/blogs/${generateSlug(blog.blog_title)}`} state={{ blog }}>
                      <button className='!w-[100%] min-h-14 px-3  shadow-xl text-xl !border-1 !border-[#FBEC6C] !bg-[var(--button-bg)] !text-[var(--text-buttons)] hover:!bg-[var(--button-hover-bg)] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                        Read More...
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Blogs;