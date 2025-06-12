import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

export async function handleBlogItemsData(userData, onSuccess, onError) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/blogs/all-blog-items/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}