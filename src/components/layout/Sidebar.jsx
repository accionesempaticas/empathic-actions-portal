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
          bg-gradient-to-b from-[#02A9A9]/80 to-[#009e9e]/80 backdrop-blur-xl border-r border-white/20 shadow-xl 
        `}
            >
                {/* Logo y botón cerrar */}
                <div className="p-6 border-b border-white/20 flex justify-between items-center">
                    <h2 className="flex items-center gap-2 text-white font-bold text-lg">
                        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain"/>
                        <div className="leading-tight">
                            <span className="text-white font-bold text-base block">Acciones</span>
                            <span className="text-white font-bold text-base block -mt-1">Empáticas</span>
                        </div>
                    </h2>
                    <button
                        onClick={onToggle}
                        className="lg:hidden text-white hover:text-secondary-300 transition-colors"
                    >
                        <MdClose size={24}/>
                    </button>
                </div>

                {/* Menú */}
                <nav className="flex-1 py-6 flex flex-col gap-1 px-2 overflow-y-auto">
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
                                className={`flex items-center gap-4 px-4 py-3 rounded-l-full font-semibold text-base transition-all duration-200 ${isActive ? 'bg-secondary-400 text-[#02A9A9] shadow-md' : 'text-white hover:bg-secondary-300 hover:text-[#02A9A9]'}`}>
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                                    {route.icon}
                                </span>
                                <span>{route.title}</span>
                            </Link>
                        );
                    })}
                </nav>
                {/* Logout al final */}
                <div className="px-4 mt-auto mb-6">
                    <button
                        onClick={logout}
                        className="cursor-pointer w-full flex items-center gap-4 px-4 py-3 rounded-full font-semibold text-base text-white hover:bg-red-600/70 transition-all duration-200"
                    >
                        <MdLogout className="text-2xl" />
                        <span>Cerrar sesión</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar; 