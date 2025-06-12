import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { handleBlogItemsData } from '../utils/blogUtils';
import { generateSlug } from '../utils/slugUtils';

function BlogContent() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      await handleBlogItemsData(
        {},
        (response) => {
          const found = response.data?.find(
            (b) => generateSlug(b.blog_title) === slug
          );
          setBlog(found);
          setLoading(false);
        },
        () => setLoading(false)
      );
    };

    fetchBlog();
  }, [slug]);

  return (
    <>
      <Header />
      <div className='text-white min-h-screen md:pt-20'>
        <section className='mt-6 md:mt-8'>
          {loading ? (
            <div className="w-full text-center pt-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
              <p className="mt-4">Loading blog...</p>
            </div>
          ) : blog ? (
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
          ) : (
            <div className="w-full text-center py-10 text-red-500">
              <p>Sorry, blog not found.</p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
}

export default BlogContent;
