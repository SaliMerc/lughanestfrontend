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


export async function handleViewTransactions(data, onSuccess, onError) {
  try {

    const token = localStorage.getItem('access_token');

    const response = await axios.get(
      `${API_URL}/api/v1/payment/payment-data/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}

// For sending the MPESA Payment
export async function handleMpesaPayment(data, onSuccess, onError) {
  try {

    const token = localStorage.getItem('access_token');

    const response = await axios.post(
      `${API_URL}/api/v1/payment/lipa-na-mpesa/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}


export async function handleLatestPaymentStatus(data, onSuccess, onError) {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/payment/payment-status/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}