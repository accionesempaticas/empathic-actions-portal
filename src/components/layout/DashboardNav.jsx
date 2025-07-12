'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import routes from '@/utils/routes';
import { useRouter } from 'next/navigation';

export default function DashboardNav() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    if (loading) {
        return null; // Or a loading spinner
    }

    if (!user) {
        return null; // No user, no navigation
    }

    const userRole = user.role;

    return (
        <nav className="bg-gray-800 p-5 shadow-xl flex justify-between items-center rounded-b-lg">
            <div className="flex items-center space-x-8">
                <ul className="flex space-x-6">
                {routes.map((route) => {
                    if (route.roles.includes(userRole)) {
                        return (
                            <li key={route.path}>
                                <Link href={route.path} className="text-gray-200 hover:text-white text-lg font-medium transition duration-300 ease-in-out relative group">
                                    {route.name}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
                                </Link>
                            </li>
                        );
                    }
                    return null;
                })}
            </ul>
            </div>
            <div className="flex items-center space-x-4">
                {user && (
                    <span className="text-gray-300 text-md font-medium">
                        Welcome, {user.name} ({user.role})
                    </span>
                )}
                <button
                    onClick={logout}
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
}
