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

    const token = localStorage.getItem('access_token');

    const response = await axios.get(
      `${API_URL}/api/v1/courses/structured-available-courses/`,
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

// For getting all the ongoing and completed courses in the dashboard
export async function handleEnrolledCourses(data, onSuccess, onError) {
  try {

    const token = localStorage.getItem('access_token');

    const response = await axios.get(
      `${API_URL}/api/v1/courses/ongoing-and-completed-courses/`,
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

// For enrolling to a course
export async function handleCourseEnrolment(data, onSuccess, onError) {
  try {
    const token = localStorage.getItem('access_token');
    console.log(token)

    const response = await axios.post(
      `${API_URL}/api/v1/courses/enroll-courses/`,
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


// For getting all the modules for a particular course that the user is enrolled in
export async function handleCourseModules(courseId, onSuccess, onError) {
  try {
    const token = localStorage.getItem('access_token');
    const response = await axios.get(
      `${API_URL}/api/v1/courses/course-modules/${courseId}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (onSuccess) onSuccess(response.data);
  } catch (error) {
    if (onError) onError(error);
  }
}