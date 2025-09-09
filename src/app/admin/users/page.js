'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import UserManagement from '@/components/admin/UserManagement';

export default function UsersPage() {
    const {user, loading} = useAuth();
    const router = useRouter();

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

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-lg shadow-xl">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
                    <p className="text-gray-600 mb-6">No tienes permisos de administrador</p>
                    <button 
                        onClick={() => router.push('/')}
                        className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    return <UserManagement />;
}