'use client';

import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // No hay usuario, redirigir al login
        router.push('/login');
      } else if (user.role === 'admin') {
        // Usuario admin, redirigir al panel administrativo
        router.push('/admin/users');
      } else {
        // Usuario no admin, cerrar sesión y redirigir al login
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  // Mostrar loading mientras se determina la redirección
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  );
}
