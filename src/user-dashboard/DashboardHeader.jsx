import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/my-logo.svg';
import open from '../assets/open-btn.svg';
import profileImage from '../assets/dashboard-images/profile-pic-placeholder.png';

import dashboardHome from '../assets/dashboard-images/dashboard-home.svg';
import dashboardCourses from '../assets/dashboard-images/dashboard-courses.svg';
import dashboardFindPartners from '../assets/dashboard-images/dashboard-find-partners.svg';
import dashboardChats from '../assets/dashboard-images/dashboard-chats.svg';
import dashboardBlog from '../assets/dashboard-images/dashboard-blog.svg';
import dashboardProfile from '../assets/dashboard-images/dashboard-profile.svg';
import dashboardPayment from '../assets/dashboard-images/my-bank.svg';
import dashboardSetting from '../assets/dashboard-images/my-setting.svg';
import dashboardLogout from '../assets/dashboard-images/dashboard-logout.svg';

import { cleanProfilePictureUrl } from '../utils/profilePic';

import ThemeToggle from '../components/ThemeToggle';

function DashboardNavigation({ children }) {
    const userDetails = JSON.parse(localStorage.getItem('user'));

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }


    const navItems = [
        { name: 'Home', path: '/dashboard-home', icon: <img src={dashboardHome} alt="Home" className="w-7 h-7" /> },
        { name: 'Courses', path: '/dashboard-courses', icon: <img src={dashboardCourses} alt="Courses" className="w-7 h-7" /> },
        { name: 'Find Partners', path: '/dashboard-find-partners', icon: <img src={dashboardFindPartners} alt="Find Partners" className="w-7 h-7" /> },
        { name: 'Chats', path: '/dashboard-chats', icon: <img src={dashboardChats} alt="Chats" className="w-7 h-7" /> },
        { name: 'Blog', path: '/dashboard-blog', icon: <img src={dashboardBlog} alt="Blog" className="w-7 h-7" /> },
    ];

    const bottomNavItems = [
        { name: 'Profile', path: '/dashboard-profile', icon: <img src={dashboardProfile} alt="Profile" className="w-7 h-7" /> },
        { name: 'Payments', path: '/dashboard-payment', icon: <img src={dashboardPayment} alt="Payments" className="w-7 h-7" /> },
        { name: 'Settings', path: '/dashboard-settings', icon: <img src={dashboardSetting} alt="Settings" className="w-7 h-7" /> },
        { name: 'Logout', path: '/logout', icon: <img src={dashboardLogout} alt="Logout" className="w-7 h-7" /> },
    ];

    return (
        <div className="flex min-h-screen bg-[var(--dashboard-nav-bg)] text-gray-200">

            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-[var(--dashboard-nav-bg)] bg-opacity-50 z-30 md:hidden"
                    aria-hidden="true"
                ></div>
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-20'
                    } bg-[var(--dashboard-nav)] shadow-md transition-all duration-300 flex flex-col overflow-hidden`}
            >
                <div className="p-5 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold text-white">LughaNest</h1>
                    ) : (
                        <Link to='/dashboard-home'>
                            <img src={logo} alt="Logo" className="h-[35px] w-[35px]" />
                        </Link>
                    )}
                </div>

                <div className="flex-1 flex flex-col overflow-hidden">
                    <nav className="overflow-y-hidden">
                        <ul className="space-y-4 p-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-lg text-white ${location.pathname === item.path
                                            ? 'bg-[var(--dashboard-nav-hover-bg)] text-white'
                                            : 'hover:bg-[var(--dashboard-nav-hover-bg)]'
                                            }`}
                                    >
                                        <span className="text-lg mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-[#FBEC6C] mt-auto">
                        <ul className="space-y-4">
                            {bottomNavItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-lg text-gray-200 ${location.pathname === item.path
                                            ? 'bg-[var(--dashboard-nav-hover-bg)] text-white'
                                            : 'hover:bg-[var(--dashboard-nav-hover-bg)]'
                                            }`}
                                    >
                                        <span className="text-lg mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className={`whitespace-nowrap ${item.name === 'Logout' ? 'text-[#E11212]' : ''}`}>{item.name}</span>}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>


            <div className="flex-1 flex flex-col min-w-0">

                <header className={`
  bg-transparent z-10 fixed top-0 transition-all duration-300 w-full
  ${isSidebarOpen ? 'md:left-64 md:w-[calc(100%-16rem)]' : 'md:left-20 md:w-[calc(100%-5rem)]'}
`}>
                    <div className="flex items-center justify-between p-4 bg-[var(--bg)] bg-opacity-90">
                        <div className='flex flex-row gap-5'>
                            <img
                                src={open}
                                onClick={toggleSidebar}
                                alt="Toggle menu"
                                className="h-[35px] cursor-pointer ml-4"
                            />
                            <div className='text-center'><ThemeToggle /></div>
                        </div>
                        <div className=" flex flex-row w-10 h-10 md:w-15 md:h-15 mr-4">

                            <Link to="/dashboard-profile">
                                <img
                                    src={userDetails.profile_picture_url || profileImage}
                                    alt="Profile"
                                    className="rounded-full object-cover w-full h-full"
                                />
                            </Link>
                        </div>
                    </div>
                </header>



                <main className={`
  flex-1 overflow-y-auto p-6 bg-[var(--bg)] mt-16
  ${isSidebarOpen ? 'md:ml-64 md:w-[calc(100%-16rem)]' : 'md:ml-20 md:w-[calc(100%-5rem)]'}
`}>
                    <div className="max-w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardNavigation;