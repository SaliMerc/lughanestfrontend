import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

// For getting all the legal items
export async function handleLegaItemsData(data, onSuccess, onError) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/legal/legal-items/`,
      data,
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