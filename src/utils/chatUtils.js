import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

// To get everyone on the system
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
