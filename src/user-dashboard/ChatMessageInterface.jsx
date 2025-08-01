import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import { handleChats } from '../utils/chatUtils';
import { handleSendChat } from '../utils/chatUtils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faEllipsisV,
    faLock,
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

    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const partnerId = location.state?.partnerId;
    const partnerName = location.state?.partnerName;

    const [subscriptionStatus, setsubscriptionStatus] = useState(userDetails.subscription_status.has_active_subscription)


    useEffect(() => {
        let intervalId;
        const fetchChats = async (isInitialLoad = false) => {
            try {
                if (isInitialLoad) setLoading(true);

                if (partnerId) {
                    const response = await handleChats(partnerId);

                    if (response?.data) {
                        setChat(prevChat => {
                            if (JSON.stringify(prevChat) !== JSON.stringify(response.data)) {
                                return response.data;
                            }
                            return prevChat;
                        });
                    } else {
                        setChat([]);
                    }
                }
            } catch (err) {
                if (isInitialLoad) {
                    setError(err.message || 'Failed to fetch chats');
                }
            } finally {
                if (isInitialLoad) setLoading(false);
            }
        };

        fetchChats(true);

        intervalId = setInterval(() => fetchChats(false), 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [partnerId]);

    console.log(chat)

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim()) {
            try {
                const messageData = {
                    receiver: partnerId,
                    message_content: message,
                    sender: userDetails.id
                };
                await handleSendChat(messageData);

                setMessage('');

                const response = await handleChats(partnerId);
                if (response?.data) {
                    setChat(response.data);
                }

            } catch (error) {
                setError('Failed to send message');
            }
        }
    };

    return (
        <DashboardNavigation>
            <div className="flex flex-col h-screen !bg-[var(--bg)] text-white">
                {/* Top fixed chat header - stays fixed while scrolling */}
                <div className="flex justify-between items-center px-4 py-3 !bg-[var(--bg)] sticky top-25 z-10 border-b !border-[var(--card-bg)]">
                    <div className="flex items-center space-x-2">
                        <Link to="/dashboard-chats">
                            <FontAwesomeIcon icon={faArrowLeft} className="text-white text-lg cursor-pointer" />
                        </Link>

                    </div>
                    <div className="text-white font-semibold text-lg">
                        <p>{partnerName}</p>
                    </div>

                    {/* <div className="relative group">
                        <FontAwesomeIcon icon={faEllipsisV} className="text-white text-lg cursor-pointer" />
                        <div className="absolute right-0 mt-2 w-32 bg-[#0E0D0C] text-white rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                            <ul className="py-1 text-sm">
                                <li className="px-4 py-2 hover:bg-[#1B1C1D] cursor-pointer">Clear Chat</li>
                                <li className="px-4 py-2 hover:bg-[#1B1C1D] cursor-pointer">Export Chat</li>
                            </ul>
                        </div>
                    </div> */}
                </div>


                <div className="flex-1 overflow-y-auto px-4 py-14 space-y-4 mt-14 mb-20">
                    <p className='text-center text-[#FBEC6C]'>Chat between {userDetails.display_name}  and {partnerName || 'Unknown'}</p>

                    {loading ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading messages...</p>
                        </div>
                    ) : chat.length === 0 ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Start a conversation😁</p>
                        </div>
                    ) : (
                        <>
                            {chat.map((msg, index) => {

                                const isCurrentUserMessage = msg.sender === userDetails.id;

                                return (
                                    <div key={index}>
                                        {isCurrentUserMessage ? (

                                            <div className="flex justify-end">
                                                <div className="!bg-[var(--card-bg)] text-white rounded-br-[1rem] rounded-tr-[1rem] rounded-bl-[1rem] px-4 py-2 shadow-md w-fit max-w-xs">
                                                    <p>{msg.message_content}</p>
                                                    <p className="text-xs mt-1 text-gray-300 font-medium">
                                                        {new Date(msg.message_sent_at).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (

                                            <div className="flex justify-start">
                                                <div className="!bg-[var(--chat-dash-interface-bg)] text-white rounded-tl-[1rem] rounded-tr-[1rem] rounded-bl-[1rem] px-4 py-2 shadow-md w-fit max-w-xs">
                                                    <p>{msg.message_content}</p>
                                                    <p className="text-xs mt-1 text-gray-400">
                                                        {new Date(msg.message_sent_at).toLocaleTimeString([], {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>


                < div className="sticky bottom-0 w-full px-4 py-3 !bg-[var(--bg)] border-t border-gray-800" >


                    {subscriptionStatus ? (
                        <form className="flex flex-row !bg-[var(--form-card-bg)] rounded-xl shadow-md px-3 py-2">
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(e);
                                        }
                                    }}
                                    id="emoji-input"
                                    className='flex-1 bg-transparent outline-none placeholder:text-gray-400 text-white resize-none md:min-h-30 md:py-15 min-h-20 py-10'
                                />
                                <div
                                >
                                    <FontAwesomeIcon icon={faPaperPlane}
                                        onSubmit={handleSubmit}

                                        className="text-white text-lg cursor-pointer ml-10" />
                                </div>
                            </div>
                        </form>
                    ) : (
                        <Link to="/dashboard/subscription-plans">
                            <button className='!w-full md:!w-full !text-[0.5rem] md:!text-[1rem]'>
                                <FontAwesomeIcon icon={faLock} /> Subscribe to Send a Message
                            </button>
                        </Link>
                    )}
                </div>
            </div>

        </DashboardNavigation>
    );
}

export default ChatInterface;