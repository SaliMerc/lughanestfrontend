import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/new-lughanest-logo.svg';
import open from '../assets/open-menu-items.svg';
import profile from '../assets/profile-image.png';

import dashboardHome from '../assets/dashboard-images/dashboard-home.svg';
import dashboardCourses from '../assets/dashboard-images/dashboard-courses.svg';
import dashboardFindPartners from '../assets/dashboard-images/dashboard-find-partners.svg';
import dashboardChats from '../assets/dashboard-images/dashboard-chats.svg';
import dashboardBlog from '../assets/dashboard-images/dashboard-blog.svg';

import dashboardProfile from '../assets/dashboard-images/dashboard-profile.svg';
import dashboardPayment from '../assets/dashboard-images/dashboard-payment.svg';
import dashboardSetting from '../assets/dashboard-images/dashboard-setting.svg';
import dashboardLogout from '../assets/dashboard-images/dashboard-logout.svg';

function DashboardNavigation({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname]);


    function toggleSidebar() {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // Dashboard Navigation Items
    const navItems = [
        { name: 'Home', path: '/home', icon: <img src={dashboardHome} alt="Home" className="w-7 h-7" /> },
        { name: 'Courses', path: '/courses', icon: <img src={dashboardCourses} alt="Courses" className="w-7 h-7" /> },
        { name: 'Find Partners', path: '/partners', icon: <img src={dashboardFindPartners} alt="Find Partners" className="w-7 h-7" /> },
        { name: 'Chats', path: '/chats', icon: <img src={dashboardChats} alt="Chats" className="w-7 h-7" /> },
        { name: 'Blog', path: '/blog', icon: <img src={dashboardBlog} alt="Blogs" className="w-7 h-7" /> },
    ];

    const bottomNavItems = [
        { name: 'Profile', path: '/profile', icon: <img src={dashboardProfile} alt="Profile" className="w-7 h-7" /> },
        { name: 'Payments', path: '/payments', icon: <img src={dashboardPayment} alt="Payment" className="w-7 h-7" /> },
        { name: 'Settings', path: '/settings', icon: <img src={dashboardSetting} alt="Setting" className="w-7 h-7" /> },
        { name: 'Logout', path: '/logout', icon: <img src={dashboardLogout} alt="Logout" className="w-7 h-7" /> },
    ];

    return (
        <div className="flex min-h-screen bg-black text-gray-200">
            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    aria-hidden="true"
                ></div>
            )}

            {/* Sidebar items */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } md:relative md:translate-x-0 ${isSidebarOpen ? 'w-64' : 'md:w-20'
                    } bg-[#0E0D0C] shadow-md transition-all duration-300 flex flex-col`}
            >
                <div className="p-5 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <h1 className="text-xl font-bold text-white">LughaNest</h1>
                    ) : (
                        <Link to='/'>
                            <img 
                            src={logo} 
                            alt="Logo"
                            className='h-[35px] w-[35px]' 
                            />
                            </Link>
                    )}
                </div>

                <nav className="flex-1 overflow-y-auto">
                    <ul className="space-y-4 p-4">
                        {navItems.map(function (item) {
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-lg text-white ${location.pathname === item.path 
                                                ? 'bg-[#0E0D0C] text-white'
                                                : 'hover:bg-black'
                                            }`}
                                    >
                                        <span className="text-lg mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="p-4 border-t border-[#FBEC6C]">
                    <ul className="space-y-4">
                        {bottomNavItems.map(function (item) {
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center p-2 rounded-lg text-gray-200 ${location.pathname === item.path
                                                ? 'bg-[#0E0D0C] text-white'
                                                : 'hover:bg-black'
                                            }`}
                                    >
                                        <span className="text-lg mr-3">{item.icon}</span>
                                        {isSidebarOpen && <span className="whitespace-nowrap">{item.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <header className="bg-transparent shadow-sm z-10">
                    <div className="flex items-center justify-between p-4">
                        <img src={open}
                            onClick={toggleSidebar}
                            alt="Toggle"
                            className="menu-icon h-[35px]"
                        />
                        <div className="w-15 h-15">
                            <Link>
                            <img src={profile} 
                            alt="Profile picture"
                            className='rounded-full object-cover w-full h-full'
                            />
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content goes here*/}
                <main className="flex-1 overflow-y-auto p-6 bg-black">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default DashboardNavigation;