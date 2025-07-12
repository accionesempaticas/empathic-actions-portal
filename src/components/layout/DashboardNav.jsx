'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import routes from '@/utils/routes';
import { useRouter } from 'next/navigation';
import {useState} from "react";


export default function DashboardNav() {
    const { user, loading, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    if (loading || !user) return null;

    const userRole = user.role;

    return (
        <>
            <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] z-50 bg-white/80 backdrop-blur-md border border-primary-50 shadow-xl rounded-2xl px-6 py-4 flex justify-between items-center">
                {/* LOGO + NOMBRE */}
                <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
                    <div className="leading-tight">
                        <span className="text-primary-700 font-bold text-base block">Acciones</span>
                        <span className="text-primary-700 font-bold text-base block -mt-1">Empáticas</span>
                    </div>
                </div>

                {/* MENÚ DESKTOP */}
                <ul className="hidden md:flex space-x-8">
                    {routes.map((route) =>
                        route.roles.includes(userRole) ? (
                            <li key={route.path}>
                                <Link
                                    href={route.path}
                                    className="text-gray-700 hover:text-primary-600 text-sm font-medium relative group transition"
                                >
                                    {route.name}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                                </Link>
                            </li>
                        ) : null
                    )}
                </ul>

                {/* BOTÓN HAMBURGUESA MOBILE */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-gray-700 hover:text-primary-600 focus:outline-none text-2xl"
                >
                    {mobileMenuOpen ? '✖' : '☰'}
                </button>

                {/* PERFIL + BOTÓN LOGOUT (desktop y mobile visible) */}
                <div className="hidden md:flex items-center space-x-4">
          <span className="text-sm text-gray-600 hidden sm:inline">
            Hola, <span className="text-primary-700 font-semibold">{user.first_name}</span>
          </span>
                    <button
                        onClick={logout}
                        className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2 px-4 rounded-full shadow-md transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>

            {/* MENÚ MOBILE DESPLEGABLE */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-24 left-4 right-4 bg-white border border-primary-100 rounded-xl shadow-lg p-4 z-40">
                    <ul className="space-y-4">
                        {routes.map((route) =>
                            route.roles.includes(userRole) ? (
                                <li key={route.path}>
                                    <Link
                                        href={route.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block text-gray-700 hover:text-primary-600 text-base font-medium transition"
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            ) : null
                        )}
                        <li>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    logout();
                                }}
                                className="w-full text-left bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                            >
                                Cerrar sesión
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
}