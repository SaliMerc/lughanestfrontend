import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

// For getting all the subscription plans
export async function handleSubscriptiontemsData(data, onSuccess, onError) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/subscription/subscription-items/`,
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