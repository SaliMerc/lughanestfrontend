import React from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faEllipsisV,
    faPaperPlane,
    faCat,
} from '@fortawesome/free-solid-svg-icons';

function ChatInterface() {
    const userDetails = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <DashboardNavigation>
            <div className="flex flex-col h-full relative overflow-hidden bg-black text-white">

                {/* Top fixed chat header */}
                <div className="flex justify-between items-center px-4 py-3 bg-black sticky top-0 z-10 shadow-md">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard-chats">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-lg cursor-pointer" />
                        </Link>
                        <div className="text-white font-semibold text-lg">Jane Doe</div>
                    </div>

                    <div className="relative group">
                        <FontAwesomeIcon icon={faEllipsisV} className="text-white text-lg cursor-pointer" />
                        <div className="absolute right-0 mt-2 w-32 bg-[#0E0D0C] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ul className="py-1 text-sm">
                                <li className="px-4 py-2 hover:bg-[#1B1C1D] cursor-pointer">Clear Chat</li>
                                <li className="px-4 py-2 hover:bg-[#1B1C1D]cursor-pointer">Export Chat</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Scrollable chat body */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {/* Left message */}
                    <div className="bg-[#0E0D0C] text-white rounded-lg px-4 py-2 shadow-md w-fit max-w-xs">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vesti</p>
                        <p className="text-xs mt-1 text-gray-400">05/05/2025</p>
                    </div>

                    {/* Right message */}
                    <div className="bg-[#1B1C1D] text-white rounded-lg px-4 py-2 shadow-md w-fit max-w-xs self-end">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vesti</p>
                        <p className="text-xs mt-1 text-gray-300 font-medium">Yesterday at 8:51 a.m</p>
                    </div>

                </div>

                {/* Message input */}
                <div className="sticky bottom-0 w-full px-4 py-3 bg-black">
                    <form className="flex flex-row bg-[#0E0D0C] rounded-xl shadow-md px-3 py-2">
                        <button type="button" className="btn">
                            <FontAwesomeIcon icon={faCat} className="text-white text-lg" />
                        </button>
                        <emoji-picker id="emoji-picker"></emoji-picker>
                        <textarea name="message-content" cols="30" rows="3" placeholder="Type your message" id="emoji-input" className='flex-1 bg-transparent outline-none placeholder:text-gray-400 text-white'></textarea>
                        <button type="submit" className="btn">
                            <FontAwesomeIcon icon={faPaperPlane} className="text-white text-lg cursor-pointer" />
                        </button>
                    </form>
                </div>

            </div>
        </DashboardNavigation>
    );
}

export default ChatInterface;
