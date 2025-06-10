import React, { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

import { Link } from 'react-router-dom';

import overallHeadingIcon from '../assets/overall-heading-image.svg';

import blogImage from '../assets/blog-image-placeholder.jpg';


function BlogContent() {

  // fake data for rendering the blogs
  const blogs = [
    {
      'blog_title': 'Jifunze Kiswahili: Maneno ya Kawaida na Matumizi Yake',
      'blog_content': 'Kiswahili ni lugha ya kuvutia na rahisi kujifunza. Katika makala hii, tutajifunza maneno ya kawaida kama "Habari yako?", "Asante", na "Karibu". Pia tutaangalia matumizi yake katika mazungumzo ya kila siku.',
      'blog_author': 'Mwanaisha Juma',
      'created_at': '2023-05-10T10:00:00Z',
      'blog_image': 'kiswahili-lesson.jpg'
    },
    {
      'blog_title': 'Learning Dholuo: Common Greetings and Phrases',
      'blog_content': 'Dholuo is a beautiful Nilotic language spoken by the Luo community. In this post, we cover basic greetings like "Amosi?" (How are you?), "Erokamano" (Thank you), and "Ber" (Good). Perfect for beginners!',
      'blog_author': 'Omondi Otieno',
      'created_at': '2023-06-15T14:30:00Z',
      'blog_image': 'dholuo-greetings.jpg'
    },
    {
      'blog_title': 'Kikuyu Proverbs and Their Meanings',
      'blog_content': 'Kikuyu proverbs (ndimo) carry deep wisdom. Learn sayings like "Gutiri mwaki utirega gicunji" (No fire leaves an ember behind) and their cultural significance in Agikuyu traditions.',
      'blog_author': 'Wanjiru Muthoni',
      'created_at': '2023-07-20T11:15:00Z',
      'blog_image': 'kikuyu-proverbs.jpg'
    },
    {
      'blog_title': 'Preserving Luhya Dialects: Why It Matters',
      'blog_content': 'With over 16 sub-tribes, Luhya languages like Lubukusu, Lulogooli, and Olunyala are at risk. This post explores efforts to document and teach these dialects before they fade away.',
      'blog_author': 'Wekesa Simiyu',
      'created_at': '2023-08-05T09:45:00Z',
      'blog_image': 'luhya-dialects.jpg'
    },
    {
      'blog_title': 'Kiswahili Slang: "Sheng" and Urban Language Trends',
      'blog_content': 'Sheng, a Swahili-English hybrid, dominates Kenyan youth culture. Learn popular phrases like "Nimechill" (I’m relaxed) and "Unajua vibe" (You know the vibe) and their origins.',
      'blog_author': 'Kevo Mwangi',
      'created_at': '2023-09-12T16:20:00Z',
      'blog_image': 'sheng-slang.jpg'
    },
    {
      'blog_title': 'Dholuo Folktales: The Story of Nyamgondho Wuod Omolo',
      'blog_content': 'Discover the legendary Luo tale of Nyamgondho, a fisherman who found fortune in Lake Victoria. We break down the story’s moral lessons and cultural importance.',
      'blog_author': 'Achieng Adhiambo',
      'created_at': '2023-10-18T13:00:00Z',
      'blog_image': 'luo-folktale.jpg'
    },
    {
      'blog_title': 'Kamba Language Basics: Greetings and Numbers',
      'blog_content': 'Kikamba is a Bantu language spoken in Eastern Kenya. This lesson covers greetings like "Ũvoo waku?" (How are you?) and counting from 1 (Ĩmo) to 10 (Ĩkũmi).',
      'blog_author': 'Mutua Kilundo',
      'created_at': '2023-11-25T10:50:00Z',
      'blog_image': 'kamba-lesson.jpg'
    },
    {
      'blog_title': 'Why Kenyan Sign Language (KSL) Deserves More Attention',
      'blog_content': 'KSL is an official language in Kenya, yet many overlook it. Learn basic signs like "Hello" (wave) and "Thank you" (flat hand to chin), plus advocacy for the deaf community.',
      'blog_author': 'Grace Atieno',
      'created_at': '2023-12-03T15:10:00Z',
      'blog_image': 'ksl-signs.jpg'
    },
    {
      'blog_title': 'Meru Proverbs: Wisdom from the Imenti People',
      'blog_content': 'The Meru community has rich oral traditions. Explore proverbs like "Kĩrĩma gĩa mũthenya gĩtirĩ mũthenya" (A mountain of problems has no specific day) and their life lessons.',
      'blog_author': 'Mugambi Nthiga',
      'created_at': '2024-01-14T12:30:00Z',
      'blog_image': 'meru-proverbs.jpg'
    },
    {
      'blog_title': 'Pokot Language: Survival Phrases for Travelers',
      'blog_content': 'Planning to visit West Pokot? Learn key Pokot phrases like "Sere?" (How are you?) and "Arai" (Water) to connect with locals during your travels.',
      'blog_author': 'Cherop Kibet',
      'created_at': '2024-02-22T08:45:00Z',
      'blog_image': 'pokot-phrases.jpg'
    },
    {
      'blog_title': 'Kiswahili Poetry: Mashairi ya Ukombozi',
      'blog_content': 'Swahili poetry has deep roots in resistance and culture. Analyze works by Shaaban Robert and Muyaka bin Haji, with translations for learners.',
      'blog_author': 'Fatma Mohamed',
      'created_at': '2024-03-30T17:00:00Z',
      'blog_image': 'swahili-poetry.jpg'
    },
    {
      'blog_title': 'Endangered Languages: The Case of Elmolo and Yaaku',
      'blog_content': 'Kenya’s Elmolo and Yaaku languages have fewer than 10 fluent speakers left. How can digital archives and community programs help preserve them?',
      'blog_author': 'Dr. Lemaron Ole Sankei',
      'created_at': '2024-04-10T11:20:00Z',
      'blog_image': 'endangered-languages.jpg'
    }
  ];

  return (
    <>
      <Header />
      <div className='text-white min-h-screen'>
        {/* courses section starts */}
        <section className='mt-6 md:mt-8'>
          <div className='flex flex-col justify-center items-center mb-5'>
            <h2 className='text-3xl md:text-5xl leading-normal font-bold mb-5'>The LughaNest Journal </h2>
            <img src={overallHeadingIcon} alt="about-image" className='h-[30px] md:h-[40px]' />
            <p className='mb-5 mt-5 text-center'>YOUR LEARNING HUB — EXPLORE, READ, GROW</p>
          </div>
          <div className='flex md:flex-wrap flex-col md:flex-row justify-center gap-8 items-center  py-5'>
            {blogs.map((blog) => (
              <div key={blog.id} className=' min-h-[250px] w-full sm:w-[45%] md:w-[30%] bg-[#1B1C1D] flex flex-col justify-center items-center text-center gap-10 rounded-[20px] p-4 md:p-6'>
                <div className='flex flex-col items-start text-left gap-2'>
                  <img src={blogImage} alt="Blog image" className='w-full h-auto mt-5 md:mt-0 rounded-2xl' />
                  <p className='text-[1.2rem] md:text-[1.5rem]'>{blog.blog_title}</p>
                  <p className='text-[#FBEC6C] text-[13px]'>By {blog.blog_author} on {new Date(blog.created_at).toLocaleDateString()}</p>
                  <hr className='text-white w-[100%]' />
                  <p>{blog.blog_content.split(" ").length > 5
                    ? blog.blog_content.split(" ").slice(0, 20).join(" ") + "..."
                    : blog.blog_content}</p>
                  <a href="/signup"><button className='min-w-36 min-h-14 px-3 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#000000] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-300'>
                    Read More...
                  </button>
                  </a>
                </div>
              </div>
            ))}

          </div>
        </section>
        {/* courses section ends */}
      </div >
      <Footer />
    </>
  );
}
export default BlogContent;
