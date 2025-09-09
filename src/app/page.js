'use client';

import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-primary-700 mb-4">Bienvenido a Empathic Actions</h1>
          <p className="text-gray-600 mb-6">Inicia sesión para acceder a la plataforma</p>
          <Link 
            href="/login"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-50">
      <div className="text-center bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-primary-700 mb-4">¡Hola, {user.full_name}!</h1>
        <p className="text-gray-600 mb-6">¿Qué deseas hacer hoy?</p>
        <div className="space-y-4">
          {user.role === 'admin' && (
            <Link 
              href="/admin/users"
              className="block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Panel de Administración
            </Link>
          )}
          {user.role === 'user' && (
            <Link 
              href="/applicants/complete-profile"
              className="block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Completar Perfil
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
