'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {MdDashboard, MdPeople, MdAssignment, MdVolunteerActivism, MdClose, MdLogout} from 'react-icons/md';
import routes from '@/utils/routes';
import {useAuth} from "@/contexts/AuthContext";


const Sidebar = ({isOpen, onToggle}) => {
    const pathname = usePathname();
    const {user, loading, logout} = useAuth();
    if (loading || !user) return null;

    const userRole = user.role;
    const filteredRoutes = routes.filter(route => route.roles.includes(userRole));

    return (
        <>
            {/* Overlay solo en móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onToggle}
                />
            )}

            <aside
                className={`
          w-64 z-50
          flex flex-col transition-all duration-300
          ${isOpen ? 'fixed left-0 top-0 h-full' : 'fixed -translate-x-full left-0 top-0 h-full'}
          lg:relative lg:translate-x-0 lg:left-0 lg:h-screen
          bg-gradient-to-b from-primary-500 to-primary-700 shadow-2xl
        `}
            >
                {/* Logo y botón cerrar */}
                <div className="p-6 border-b border-primary-400/30 flex justify-between items-center bg-gradient-to-r from-primary-600 to-primary-500">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-2 rounded-xl shadow-lg">
                            <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain"/>
                        </div>
                        <div className="leading-tight">
                            <h2 className="text-white font-extrabold text-lg tracking-tight">Acciones</h2>
                            <h2 className="text-primary-100 font-bold text-sm -mt-1">Empáticas</h2>
                        </div>
                    </div>
                    <button
                        onClick={onToggle}
                        className="lg:hidden text-white hover:text-accent-300 p-2 rounded-lg hover:bg-primary-600/50 transition-all duration-200"
                    >
                        <MdClose size={24}/>
                    </button>
                </div>

                {/* Menú */}
                <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
                    {filteredRoutes.map((route) => {
                        const isActive = pathname === route.path;

                        return (
                            <Link
                                key={route.path}
                                href={route.path}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        onToggle();
                                    }
                                }}
                                className={`group flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-base transition-all duration-300 ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-xl transform scale-[1.02]' 
                                        : 'text-primary-100 hover:bg-white/10 hover:text-white hover:shadow-lg'
                                }`}>
                                <span className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${isActive ? 'text-white' : 'text-primary-200'}`}>
                                    {route.icon}
                                </span>
                                <span className="tracking-wide">{route.title}</span>
                                {isActive && (
                                    <div className="ml-auto">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
                {/* Logout al final */}
                <div className="px-4 mt-auto mb-6 border-t border-primary-400/30 pt-6">
                    <button
                        onClick={logout}
                        className="group cursor-pointer w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-base text-primary-100 hover:bg-red-500/20 hover:text-white border border-primary-400/30 hover:border-red-400 transition-all duration-300 hover:shadow-lg"
                    >
                        <MdLogout className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                        <span className="tracking-wide">Cerrar sesión</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-sm">→</span>
                        </div>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 