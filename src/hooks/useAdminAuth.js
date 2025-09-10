'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                // No hay usuario logueado, redirigir al login
                router.push('/login');
                return;
            }

            if (user.role !== 'admin') {
                // Usuario no es admin, cerrar sesión y redirigir
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }
        }
    }, [user, loading, router]);

    // Retornar el estado de carga y si el usuario es admin válido
    return {
        isAdmin: user?.role === 'admin',
        loading,
        user
    };
}