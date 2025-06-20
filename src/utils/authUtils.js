import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

export async function handleGoogleLogin(credential, onSuccess, onError) {
  try {

    const response = await axios.post(`${API_URL}/api/v1/auth/google/`, {
      token: credential,
    });

    const { data } = response;

    if (data.access_token && data.refresh) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    }

    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}

export async function handleGettingLocation(locData, onSuccess, onError) {
  try {
    const response = await axios.get("https://ipapi.co/json/", locData,
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
    if (onError) onError(error);
  }
}

export async function handleSignupTokenVerification(userData, onSuccess, onError) {
  try {
    const response = await axios.post(`${API_URL}/api/v1/users/account-verification/`, userData,
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

export async function handleActivationLinkResend(userData, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/resend-verification/`,
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
    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}


export async function handleValidateResetToken(token, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/validate-reset-token/`,
      token,
      {
        headers:
          { "Content-Type": "application/json" }
      }
    );

    if (onSuccess)
      onSuccess(response)
  } catch (error) {
    if (onError) onError(error);
  }
}

export async function handleSubmitNewPassword(
  userData, onSuccess, onError) {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1/users/confirm-password-reset/`,
      userData,
      {
        headers:
          { "Content-Type": "application/json" }
      }
    );
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

    const { data } = response;

    if (data.access && data.refresh) {
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
    }

    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}

// For setting the password once the user is logged in
export async function handlePasswordChangeLoggedIn(userData, onSuccess, onError) {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.post(
      `${API_URL}/api/v1/users/change-password/`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = response;

    if (data.access && data.refresh) {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }

    }

    if (onSuccess) onSuccess(response);
  } catch (error) {
    if (onError) onError(error);
  }
}

// To schedule for account deletion
export async function scheduleAccountDeletion() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.delete(
      `${API_URL}/api/v1/users/delete-account/`,
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

// To check if account deletion have been scheduled
export async function checkDeletionStatus() {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/users/delete-account/`,
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