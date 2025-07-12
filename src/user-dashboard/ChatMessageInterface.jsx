import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faEllipsisV,
    faPaperPlane,
    faCat,
} from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';



function ChatInterface() {
    const userDetails = JSON.parse(localStorage.getItem('user')) || {};
    const messagesEndRef = useRef(null);


    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const textareaRef = useRef(null);

    // Auto-scroll to bottom when component mounts or messages update
    useEffect(() => {
        scrollToBottom();
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleEmojiClick = (emojiData) => {
        setMessage(prevMessage => prevMessage + emojiData.emoji);
        setShowEmojiPicker(false);
        textareaRef.current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // Handle message submission here
            console.log('Message sent:', message);
            setMessage('');
        }
    };

    return (
        <DashboardNavigation>
            <div className="flex flex-col h-screen bg-black text-white">
                {/* Top fixed chat header - stays fixed while scrolling */}
                <div className="flex justify-between items-center px-4 py-3 bg-black sticky top-25 z-10 border-b border-gray-800">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard-chats">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-lg cursor-pointer" />
                        </Link>

                    </div>
                    <div className="text-white font-semibold text-lg">
                        <p>Jane Doe</p>
                    </div>

                    <div className="relative group">
                        <FontAwesomeIcon icon={faEllipsisV} className="text-white text-lg cursor-pointer" />
                        <div className="absolute right-0 mt-2 w-32 bg-[#0E0D0C] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                            <ul className="py-1 text-sm">
                                <li className="px-4 py-2 hover:bg-[#1B1C1D] cursor-pointer">Clear Chat</li>
                                <li className="px-4 py-2 hover:bg-[#1B1C1D] cursor-pointer">Export Chat</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Scrollable chat body with padding to account for fixed header and input */}
                <div className="flex-1 overflow-y-auto px-4 py-14 space-y-4 mt-14 mb-20">
                    <p className='text-center text-[#FBEC6C]'>Chat between A and B</p>
                    {[...Array(30)].map((_, i) => (
                        <React.Fragment key={i}>
                            <div className="flex justify-start">
                                <div className="bg-[#0E0D0C] text-white rounded-tl-[1rem] rounded-tr-[1rem] rounded-bl-[1rem] px-4 py-2 shadow-md w-fit max-w-xs">
                                    <p>Message thiiiiiiissss {i + 1}</p>
                                    <p className="text-xs mt-1 text-gray-400">05/05/2025</p>
                                </div>
                            </div>

                            {/* Right-aligned reply (outgoing) */}
                            <div className="flex justify-end">
                                <div className="bg-[#1B1C1D] text-white rounded-br-[1rem] rounded-tr-[1rem] rounded-bl-[1rem] px-4 py-2 shadow-md w-fit max-w-xs">
                                    <p>Reply yayyyyyy {i + 1}</p>
                                    <p className="text-xs mt-1 text-gray-300 font-medium">Yesterday at 8:51 a.m</p>
                                </div>
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Empty div at the bottom for auto-scrolling */}
                    <div ref={messagesEndRef} />
                </div>

                {/* Fixed message input at the bottom */}
                <div className="sticky bottom-0 w-full px-4 py-3 bg-black border-t border-gray-800">
                    <form className="flex flex-row bg-[#0E0D0C] rounded-xl shadow-md px-3 py-2">
                        <div className='flex flex-row justify-between items-center w-full'>
                            <div>
                                <FontAwesomeIcon icon={faCat}
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-white text-lg cursor-pointer mr-10" />
                            </div>

                            {showEmojiPicker && (
                                <div className="absolute bottom-30 left-0 z-50">
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiClick}
                                        width={300}
                                        height={400}
                                    />
                                </div>
                            )}

                            <textarea
                                name="message-content"
                                cols="30"
                                rows="1"
                                placeholder="Type your message"
                                ref={textareaRef}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                id="emoji-input"
                                className='flex-1 bg-transparent outline-none placeholder:text-gray-400 text-white resize-none md:min-h-30 md:py-15 min-h-20 py-10'
                            />
                            <div>
                                <FontAwesomeIcon icon={faPaperPlane} 
                                
                                className="text-white text-lg cursor-pointer ml-10" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardNavigation>
    );
}

export default ChatInterface;