'use client';

import {useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const {login, user, loading} = useAuth();

    if (loading) return null;

    if (user) {
        router.push(user.role === 'admin' ? '/admin/users' : '/applicants/complete-profile');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión. Verifica tus credenciales.');
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100 px-4">
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md p-10 space-y-6">
                {/* Logo con texto */}
                <div className="flex items-center justify-center space-x-4 mb-2">
                    {/* Isotipo */}
                    <img
                        src="/logo.png"
                        alt="Isotipo"
                        className="h-12 w-12 object-contain"
                    />

                    {/* Texto en dos líneas */}
                    <div className="text-left leading-none">
                        <h2 className="text-lg font-bold text-primary-700">ACCIONES</h2>
                        <h2 className="text-lg font-bold text-primary-700">EMPÁTICAS</h2>
                    </div>
                </div>


                {/* Título y mensaje */}
                <h1 className="text-3xl font-extrabold text-center text-primary-700">Bienvenid@ 🩵💛</h1>
                <p className="text-center text-gray-600 text-sm">
                    Accede a la plataforma de <strong>voluntariado 2025-II</strong> y acompáñanos en esta gran
                    experiencia.
                </p>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <p className="text-red-600 text-center font-medium">{error}</p>
                    )}

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Correo
                            electrónico</label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-800 shadow-sm"
                        />
                    </div>

                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 pr-12 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-800 shadow-sm"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600 focus:outline-none"
                            tabIndex={-1}
                        >
                            {showPassword ? '🙈' : '🐵️'}
                        </button>
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
}