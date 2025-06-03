import React, { useState } from 'react';
import logo from '../assets/lughnest-logo.svg';
import open from '../assets/open-menu.svg';
import close from '../assets/close-menu.svg';
import '../index.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='text-[#FBEC6C] mt-5 md:mt-2 mb-12'>
      <nav className="flex justify-between items-center">
        <div className='logo-and-toggle-items flex justify-between w-full'>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <div className="logo-toggle-items block md:hidden">
            <img
              src={menuOpen ? close : open}
              alt="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-icon"
            />
          </div>
        </div>

        <div className={`nav-items flex gap-[22rem] text-[#6D3710] md:text-[#FBEC6C] ${menuOpen ? 'open' : ''}`}>
          <ul className='flex gap-8 mt-7'>
            <li><a href="/">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Courses</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Contact</a></li>
            <li><a href="">Blog</a></li>
          </ul>
          <a href="/login"><button className='w-36 h-14 !bg-[#8F5932] md:!bg-[#FBEC6C] shadow-xl !shadow-[#8F5932] text-xl text-[#FBEC6C] md:!text-black'>Sign In</button></a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
