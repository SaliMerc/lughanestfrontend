import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL

// For getting all the available courses
export async function handleCourseItemsData(data, onSuccess, onError) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/courses/available-courses/`,
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

// For getting all the available courses in the dashboard
export async function handleStructuredCourseItemsData(data, onSuccess, onError) {
  try {
    const response = await axios.get(
      `${API_URL}/api/v1/courses/structured-available-courses/`,
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