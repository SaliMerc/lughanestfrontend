import React, { useState } from 'react';
import logo from '../assets/new-lughanest-logo.svg';
import open from '../assets/open-menu-items.svg';
import close from '../assets/close-menu-items.svg';
import '../index.css';

import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='text-[#E3E0C0] mt-5 md:mt-2 mb-12'>
      <nav className="flex justify-between items-center">
        <div className='logo-and-toggle-items flex justify-between w-full'>
          <div className="logo">
            <Link to='/'><img src={logo} alt="Logo" /></Link>
          </div>
          <div className="logo-toggle-items block md:hidden">
            <img
              src={menuOpen ? close : open}
              alt="toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="menu-icon h-[35px]"
            />
          </div>
        </div>

        <div className={`nav-items flex gap-[22rem] text-[#6D3710] md:text-[#E3E0C0] ${menuOpen ? 'open' : ''}`}>
          <ul className='flex gap-8 mt-7'>
            {/* <Link to='/signup'>yooh</Link> */}
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/#about'>About</Link></li>
            <li><Link to='/courses'>Courses</Link></li>
            <li><Link to='/#pricing'>Pricing</Link></li>
            <li><Link to='/#contact'>Contact</Link></li>
            <li><Link to='/blogs'>Blog</Link></li>
          </ul>
          <Link to="/login"><button className='w-36 h-14 !bg-[#0E0D0C] md:!bg-[#0E0D0C] shadow-xl !shadow-[#8F5932] text-xl text-[#E3E0C0] md:!text-[#E3E0C0] !border-1 !border-[#FBEC6C] hover:!bg-[#FBEC6C] hover:!text-[#0E0D0C] transition-colors !duration-30'>Sign In</button></Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
