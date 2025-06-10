import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header.jsx';
import Footer from './Footer.jsx';

import blogImage from '../assets/blog-image-placeholder.jpg';

import Blogs from './Blogs';
import { blogs } from './Blogs';

const generateSlug = (title) =>
    title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');


function BlogContent() {

    const { slug } = useParams();

    const blog = blogs.find((b) => generateSlug(b.blog_title) === slug);

    if (!blog) return <p className="p-6 text-red-500">Blog not found</p>;

    return (
        <>
            <Header />
            <div className='text-white min-h-screen md:px-5 md:pt-25'>
                {/* courses section starts */}
                <section className='mt-6 md:mt-8'>
                    <div className='flex flex-col justify-left items-left mb-5'>
                        <h2 className='text-2xl md:text-4xl leading-normal font-bold mb-5'>{blog.blog_title} </h2>
                    </div>
                    <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center  py-5'>

                        <div className=' min-h-[250px] w-full bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-10 rounded-[20px] p-4 md:p-6'>
                            <img src={blogImage} alt="Blog image" className='w-[90%] md:h-[550px] mt-5 md:mt-0 rounded-2xl' />
                            <div className='flex flex-col items-left text-left gap-2 w-[90%]'>
                                <p className='text-[#FBEC6C] text-[16px]'>By {blog.blog_author} on {new Date(blog.created_at).toLocaleDateString()}</p>
                                <hr className='text-white w-[100%]' />
                                <p className='leading-normal'>{blog.blog_content}</p>
                            </div>
                        </div>


                    </div>
                </section>
                {/* courses section ends */}
            </div >
            <Footer />
        </>
    );
}
export default BlogContent;
