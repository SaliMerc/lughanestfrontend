import React, { useState, useEffect } from 'react';
import logo from '../assets/my-logo.svg';
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
    <header className={`text-[#E3E0C0] w-full mt-5 md:mt-0  md:h-[7rem] md:fixed md:top-0 md:left-0 md:right-5 md:z-50 transition-colors duration-300 items-center ${scrolled ? '!bg-[var(--nav-bg)] ' : ''
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
        <div className={`text-center itema pr-4 nav-items flex font-semibold gap-[22rem] text-[#E3E0C0] ${menuOpen ? 'open' : ''}`}>
          <ul className='flex gap-8 mt-7'>
            <li className='hover:underline hover:text-[var(--nav-hover)]'><Link to='/'>Home</Link></li>
            <li className='hover:underline hover:!text-[var(--nav-hover)]'><Link to='/#about'>About</Link></li>
            <li className='hover:underline hover:!text-[var(--nav-hover)]'><Link to='/courses'>Courses</Link></li>
            <li className='hover:underline hover:!text-[var(--nav-hover)]'><Link to='/#pricing'>Pricing</Link></li>
            <li className='hover:underline hover:!text-[var(--nav-hover)]'><Link to='/#contact'>Contact</Link></li>
            <li className='hover:underline hover:!text-[var(--nav-hover)]'><Link to='/blogs'>Blog</Link></li>
          </ul>

          
          <Link to="/login"><button className='!min-w-50 min-h-14 px-3 !bg-[var(--main-buttons-bg)] !text-[var(--main-buttons-text)] hover:!text-[var(--main-buttons-hover-text)] hover:!bg-[var(--main-buttons-hover-bg)] shadow-xl !shadow-[#000000] text-xl font-bold !border-1 !border-[#FBEC6C] transition-colors !duration-300 text-center '>Sign In</button></Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
