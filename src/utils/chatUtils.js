import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

export async function handleFindPartners() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/find-partners/find-partners/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


// To get the latest chats related to the user in the system
export async function handleLatestChats() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/chats/my-latest-messages/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


// To get the chats related to the user in the system
export async function handleChats(partnerId) { 
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/chats/all-my-messages/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          partner_id: partnerId  
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function handleSendChat(userData) {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
      `${API_URL}/api/v1/chats/create-a-message/`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}
