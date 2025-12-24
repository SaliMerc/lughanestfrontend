// src/utils/auth.js   ← THIS FILE MUST EXIST

import axios from 'axios';

const API_URL = import.meta.env.VITE_DEVELOPMENT_API_URL;

const authAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.defaults.withCredentials = true;

// ─────── IN-MEMORY GLOBAL STATE (this is your "store") ───────
let currentAccessToken = null;
let currentUser = null;

let subscribers = [];
const subscribe = (cb) => subscribers.push(cb);
const notify = () => subscribers.forEach(cb => cb());

// THIS IS THE ONE YOU WERE MISSING THE EXPORT FOR
export const setAuthState = (token, user) => {
  currentAccessToken = token;
  currentUser = user;
  notify(); 
};

export const getCurrentUser = () => currentUser;
export const getAccessToken = () => currentAccessToken;
export const isAuthenticated = () => !!currentAccessToken && !!currentUser;

// ─────── INTERCEPTORS (auto-add token + auto-refresh) ───────
axios.interceptors.request.use(config => {
  if (currentAccessToken) {
    config.headers.Authorization = `Bearer ${currentAccessToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  res => res,
  async error => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const res = await authAxios.post('/api/v1/auth/token/refresh/');
        const { access_token, user } = res.data;
        setAuthState(access_token, user);
        original.headers.Authorization = `Bearer ${access_token}`;
        return axios(original);
      } catch {
        setAuthState(null, null);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// ─────── RESTORE SESSION ON PAGE REFRESH ───────
export const initializeAuth = async () => {
  try {
    const res = await authAxios.post('/api/v1/auth/token/refresh/');
    const { access_token, user } = res.data;
    setAuthState(access_token, user);
  } catch {
    setAuthState(null, null);
  }
};