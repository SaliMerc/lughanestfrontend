import axios from 'axios';

export async function handleGoogleLogin(credential, onSuccess, onError) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/google/', {
      token: credential,
    });

    const { access, refresh, user } = response.data;

    // Save tokens and user info
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('user', JSON.stringify(user));

    if (onSuccess) onSuccess(); // callback for redirect or UI updates
  } catch (error) {
    console.error('Google login failed:', error);
    if (onError) onError(error);
  }
}

export async function handleEmailSignup(userData, onSuccess, onError) {
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/v1/users/', userData);


    const { access, refresh, user } = response.data;

    // console.log(response)

    // localStorage.setItem('access', access);
    // localStorage.setItem('refresh', refresh);
    // localStorage.setItem('user', JSON.stringify(user));

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error('Signup failed:', error);
    if (onError) onError(error);
  }
}
