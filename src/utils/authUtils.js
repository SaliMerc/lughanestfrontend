import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

export async function handleGoogleLogin(credential, onSuccess, onError) {
  try {

    const response = await axios.post(`${API_URL}/api/v1/auth/google/`, {
      token: credential,
    });

    if (onSuccess) onSuccess(response);
  } catch (error) {
    console.error('Google login failed:', error);
    if (onError) onError(error);
  }
}

export async function handleEmailSignup(userData, onSuccess, onError) {
  try {
    const response = await axios.post(`${API_URL}/api/v1/users/`, userData,
       {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (onSuccess) onSuccess(response);
  } catch (error) {
    console.error('Signup failed:', error);
    if (onError) onError(error);
  }
}

export async function handlePasswordReset(userData, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/password-reset-not-logged-in/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`The response is: ${response}`)
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}

export async function handleEmailLogin(userData, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/login/`,
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