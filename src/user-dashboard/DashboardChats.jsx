import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardNavigation from './DashboardHeader';

import profileImage from '../assets/profile-image.png';

import { generateSlug } from '../utils/slugUtils';
import { handleLatestChats } from '../utils/chatUtils';
import { capitalizeFirst } from '../utils/slugUtils';

import {cleanProfilePictureUrl} from '../utils/profilePic';


function DashboardChats() {
    const userDetails = JSON.parse(localStorage.getItem('user'));


    const [latestChat, setLatestChat] = useState([]);

    const [otherUser, setOtherUser] = useState('')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserId = userDetails.id;


    useEffect(() => {
        const fetchLatestChats = async () => {
            try {
                setLoading(true);
                const response = await handleLatestChats();

                if (response) {
                    const chatsWithOtherUser = response.data.map(chat => {
                        const otherUserId = chat.sender === currentUserId ? chat.receiver : chat.sender;
                        return {
                            ...chat,
                            otherUserId,
                            otherUserName: chat.sender === currentUserId ? chat.receiver_display_name : chat.sender_display_name,
                            otherUserProfilePic: chat.sender === currentUserId ? chat.receiver_profile_picture : chat.sender_profile_picture
                        };
                    });

                    setLatestChat(chatsWithOtherUser);
                } else {
                    setLatestChat([]);
                }
            } catch (err) {
                setError(err.message || 'Failed to fetch latest chats');
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestChats();
    }, []);


    return (
        <DashboardNavigation>
            <div>
                <section>

                    <h1 className='text-2xl md:text-4xl font-semibold text-[#FBEC6C]'>My Chats</h1>

                    <section className='flex flex-col justify-left gap-2 md:gap-4 items-center py-7'>

                        {loading ? (

                            <div className="w-full text-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FBEC6C] mx-auto"></div>
                                <p className="mt-4">Loading chats...</p>
                            </div>

                        ) : latestChat.length === 0 ? (

                            <div className="w-full text-center py-10">
                                <p>No Chats Yet</p>
                            </div>
                        ) : (

                            latestChat.map((chat, index) => (
                                <div key={index} className=' min-h-[100px] !w-[100%] bg-[var(--dashboard-card-bg)]  flex flex-col !rounded-[20px]'>
                                    <Link to={`/dashboard-chats/chat-interface/${generateSlug(chat.otherUserName)}`} state={{ 
                                        partnerId: chat.otherUserId,
                                        partnerName: chat.otherUserName 
                                     }}>
                                        <div className='flex flex-row items-center justify-between text-left gap-2 p-3'>
                                            <div className='flex flex-row items-center gap-4'>
                                                <div className='w-10 h-10 md:w-15 md:h-15'>
                                                    <img
                                                        src={cleanProfilePictureUrl(chat.otherUserProfilePic) || profileImage}
                                                        alt="Profile"
                                                        className="rounded-full object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div>
                                                    <p className='text-[1.2rem] md:text-[1.5rem] first-letter:uppercase text-[#FBEC6C] mb-3 '>{chat.otherUserName}</p>
                                                    <p className='first-letter:uppercase'>{capitalizeFirst(chat.message_content)}</p>
                                                </div>

                                            </div>
                                            <div>
                                                {new Date(chat.message_sent_at).toLocaleTimeString([], {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                }).toLowerCase()}
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            ))
                        )}
                    </section>
                </section>

            </div>
        </DashboardNavigation>
    );
}

export default DashboardChats;