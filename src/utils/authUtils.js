import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

export async function handleGoogleLogin(credential, onSuccess, onError) {
  try {

    const response = await axios.post(`${API_URL}/api/v1/auth/google/`, {
      token: credential,
    });

    const { access, refresh, user } = response.data;

    // Save tokens and user info
    // localStorage.setItem('access', access);
    // localStorage.setItem('refresh', refresh);
    // localStorage.setItem('user', JSON.stringify(user));

    if (onSuccess) onSuccess(response);
  } catch (error) {
    console.error('Google login failed:', error);
    if (onError) onError(error);
  }
}

export async function handleEmailSignup(userData, onSuccess, onError) {
  try {
    const response = await axios.post(`${API_URL}/api/v1/users/`, userData);


    const { access, refresh, user } = response.data;

    // localStorage.setItem('access', access);
    // localStorage.setItem('refresh', refresh);
    // localStorage.setItem('user', JSON.stringify(user));

    if (onSuccess) onSuccess(response);
  } catch (error) {
    console.error('Signup failed:', error);
    if (onError) onError(error);
  }
}

export async function handleEmailSignupVerification(userData, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/otp-verification/`,
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