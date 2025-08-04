/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración para Vercel
  output: 'standalone',
  
  // Configuración de imágenes
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  
  // Configuración de variables de entorno
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'
  },
  
  // Configuración de ESLint para ignorar errores en build
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
