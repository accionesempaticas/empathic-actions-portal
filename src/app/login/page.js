'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const { login, user, loading } = useAuth();

    // If authentication is still loading, show a loading state
    if (loading) {
        return null; // Or a loading spinner
    }

    // If user is already logged in, redirect them
    if (user) {
        if (user.role === 'admin') {
            router.push('/admin/documents');
        } else {
            router.push('/commitment-letters');
        }
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            // Redirection handled by AuthContext
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión. Por favor, verifica tus credenciales.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-50">
            <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-extrabold mb-8 text-center text-primary-700">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-600 text-center mb-4 font-medium">{error}</p>}
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm border border-primary-200 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 ease-in-out"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm border border-primary-200 rounded-lg w-full py-3 px-4 text-gray-800 mb-4 leading-tight focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-200 ease-in-out"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition duration-200 ease-in-out w-full"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
