import axios from 'axios';

import { storage } from './storage';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://api.example.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await storage.secure.getString('auth_token');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message ?? error.message;
    return Promise.reject(new Error(message));
  }
);

export { apiClient };
