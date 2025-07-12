'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    // Mientras carga la sesión, opcionalmente muestra algo
    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500">
                Verificando sesión...
            </div>
        );
    }

    return (
        <div className="pt-24 px-4 md:px-6 max-w-6xl mx-auto">
            {children}
        </div>
    );
}
