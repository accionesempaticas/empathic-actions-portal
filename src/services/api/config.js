import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globalmente
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api; 