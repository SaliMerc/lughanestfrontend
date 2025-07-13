import React, { useState, useEffect } from 'react';
import logo from '../assets/new-lughanest-logo.svg';
import open from '../assets/open-menu-items.svg';
import close from '../assets/close-menu-items.svg';
import '../index.css';

import ThemeToggle from '../components/ThemeToggle';

import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`text-[#E3E0C0] mt-5 md:mt-0 mb-12 md:h-23 md:fixed md:top-0 md:left-0 md:right-5 md:z-50 transition-colors duration-300 items-center ${scrolled ? 'bg-[#000000] ' : ''
      }`}>
      <nav className="flex justify-between items-center">

        <div className='logo-and-toggle-items flex justify-between w-full'>

          <div className="pl-4 pt-4 pb-3 logo hidden  md:flex md:flex-row md:gap-5 items-center">
            <Link to='/'><img src={logo} alt="Logo" /></Link>
            <div className='text-center'><ThemeToggle/></div>
          </div>
          <div className="logo-toggle-items flex w-full justify-between md:hidden ">

            <div className="logo">
              <Link to='/'><img src={logo} alt="Logo" /></Link>
            </div>
            <div className='flex flex:row gap-4 mr-3'>
            <div className='text-center'><ThemeToggle/></div>
            <img
              src={menuOpen ? close : open}
              alt="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-icon h-[35px]"
            />
            </div>
          </div>

        </div>
        <div className={`text-center itema nav-items flex font-semibold gap-[22rem] text-[#E3E0C0] ${menuOpen ? 'open' : ''}`}>
          <ul className='flex gap-8 mt-7'>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/'>Home</Link></li>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/#about'>About</Link></li>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/courses'>Courses</Link></li>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/#pricing'>Pricing</Link></li>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/#contact'>Contact</Link></li>
            <li className='hover:underline hover:text-[#FBEC6C]'><Link to='/blogs'>Blog</Link></li>
          </ul>

          
          <Link to="/login"><button className='!min-w-40 min-h-14 px-3 !bg-[#FBEC6C] md:!bg-[#FBEC6C] shadow-xl !shadow-[#000000] text-xl !text-black font-bold !border-1 !border-[#FBEC6C] hover:!bg-[#0E0D0C] hover:!text-[#E3E0C0] transition-colors !duration-300 text-center'>Sign In</button></Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
