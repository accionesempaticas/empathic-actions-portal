'use client';

import {useState, useEffect} from 'react';
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

    useEffect(() => {
        if (user && !loading) {
            if (user.role === 'admin') {
                router.push('/admin/users');
            } else {
                // Si el usuario no es admin, cerrar sesión automáticamente
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                setError('Acceso denegado. Solo los administradores pueden ingresar al sistema.');
            }
        }
    }, [user, loading, router]);

    if (loading) return null;

    if (user) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await login(email, password);
            if (userData.role === 'admin') {
                router.push('/admin/users');
            } else {
                // Solo permitir acceso a administradores
                setError('Acceso denegado. Solo los administradores pueden ingresar al sistema.');
                // Limpiar sesión del usuario no admin
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                return;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error de inicio de sesión. Verifica tus credenciales.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
            
            {/* Patrón de fondo decorativo */}
            <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Contenedor principal con el estilo de la tabla */}
            <div className="relative z-10 w-full max-w-5xl mx-auto p-8">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100">
                    
                    {/* Encabezado con gradiente turquesa */}
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Image src="/logo.png" alt="Logo" className="h-20 w-20 object-contain" width={100} height={100} />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                            ACCIONES EMPÁTICAS
                        </h1>
                        <p className="text-primary-100 text-lg font-medium">
                            Portal de Gestión de Voluntariado 2025-II
                        </p>
                    </div>

                    <div className="flex">
                        {/* Sección izquierda: información */}
                        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-neutral-50 to-primary-50 p-12 items-center">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-primary-700 mb-3">
                                        Bienvenid@ al Sistema
                                    </h3>
                                    <p className="text-neutral-600 leading-relaxed mb-6">
                                        Plataforma integral para la gestión de voluntarios y coordinación de acciones empáticas en nuestra comunidad.
                                    </p>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center text-primary-600">
                                        <div className="w-3 h-3 bg-success-500 rounded-full mr-3"></div>
                                        <span className="font-medium">Gestión de Voluntarios</span>
                                    </div>
                                    <div className="flex items-center text-primary-600">
                                        <div className="w-3 h-3 bg-accent-500 rounded-full mr-3"></div>
                                        <span className="font-medium">Seguimiento de Proyectos</span>
                                    </div>
                                    <div className="flex items-center text-primary-600">
                                        <div className="w-3 h-3 bg-secondary-500 rounded-full mr-3"></div>
                                        <span className="font-medium">Documentación Digital</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sección derecha: formulario */}
                        <div className="w-full lg:w-1/2 p-12">
                            <div className="max-w-md mx-auto">
                                <h2 className="text-3xl font-bold text-center text-neutral-800 mb-2">
                                    Acceso Administrativo
                                </h2>
                                <p className="text-center text-neutral-500 mb-8">
                                    Solo administradores pueden acceder al sistema
                                </p>

                                {/* Formulario */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {error && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                                            <p className="text-sm font-medium">{error}</p>
                                        </div>
                                    )}

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-bold text-neutral-700 mb-2">
                                            Correo Electrónico
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full px-4 py-4 rounded-xl border-2 border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-neutral-50 focus:bg-white shadow-sm"
                                            placeholder="Correo electronico"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-bold text-neutral-700 mb-2">
                                            Contraseña
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-neutral-50 focus:bg-white shadow-sm"
                                                placeholder="••••••••••"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary-600 transition duration-200 focus:outline-none"
                                                tabIndex={-1}
                                            >
                                                {showPassword ? (
                                                    <span className="text-lg">👁️</span>
                                                ) : (
                                                    <span className="text-lg">🙈</span>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-primary-200"
                                    >
                                        Ingresar al Sistema
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    {/* Footer */}
                    <div className="bg-neutral-50 px-8 py-4 border-t border-neutral-200">
                        <p className="text-center text-xs text-neutral-500">
                            © 2025 Acciones Empáticas - Sistema de Gestión de Voluntariado
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}