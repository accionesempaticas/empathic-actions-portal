'use client';

import {useState} from 'react';
import {useAuth} from '@/contexts/AuthContext';
import {useRouter} from 'next/navigation';
import Image from "next/image";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const {login, user, loading} = useAuth();

    if (loading) return null;

    if (user) {
        router.push(user.role === 'admin' ? '/admin/dashboard' : '/applicants/complete-profile');
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-50 relative overflow-hidden">

            {/* Fondo decorativo en la izquierda (solo en pantallas grandes) */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 hidden lg:block">
                <div className="h-full w-full bg-[url('/voluntariado.jpg')] bg-no-repeat bg-left bg-auto" />
            </div>

            {/* Capa de difuminado encima del fondo (opcional, para legibilidad) */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0" />

            {/* Contenedor principal (imagen izquierda + formulario derecha) */}
            <div className="relative z-10 flex w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden bg-white/90 backdrop-blur-md">

                {/* Sección izquierda: branding */}
                <div className="hidden lg:flex w-1/2 items-center justify-center p-8 bg-white/60">
                    <div className="text-center space-y-4">
                        <Image src="/logo.png" alt="Logo" className="h-16 w-16 mx-auto object-contain" width={100} height={100} />
                        <h2 className="text-3xl font-bold text-primary-700">ACCIONES EMPÁTICAS</h2>
                        <p className="text-gray-700">
                            Sé parte del <strong>cambio</strong> y únete al voluntariado 2025-II 💛🩵
                        </p>
                    </div>
                </div>

                {/* Sección derecha: formulario */}
                <div className="w-full lg:w-1/2 p-10 space-y-6">
                    {/* Título y mensaje */}
                    <h1 className="text-3xl font-extrabold text-center text-primary-700">Bienvenid@</h1>
                    <p className="text-center text-gray-600 text-sm">
                        Accede a la plataforma de <strong>voluntariado</strong> y acompáñanos en esta gran experiencia.
                    </p>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && <p className="text-red-600 text-center font-medium">{error}</p>}
                        
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-800 shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                                Contraseña
                            </label>
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
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl shadow-md transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}