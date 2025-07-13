'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdPeople, MdAssignment, MdVolunteerActivism, MdClose } from 'react-icons/md';

const menuItems = [
  { title: 'Dashboard', path: '/', icon: <MdDashboard size={22} /> },
  { title: 'Personas', path: '/personas', icon: <MdPeople size={22} /> },
  { title: 'Proyectos', path: '/proyectos', icon: <MdAssignment size={22} /> },
  { title: 'Voluntarios', path: '/voluntarios', icon: <MdVolunteerActivism size={22} /> },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay solo en móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`
          bg-gradient-to-b from-[#02A9A9] to-[#009e9e] rounded-l-3xl shadow-xl flex flex-col
          transition-all duration-300
          ${isOpen ? 'fixed left-0 top-0 h-full z-50' : 'fixed -translate-x-full left-0 top-0 h-full z-50'}
          lg:relative lg:translate-x-0 lg:left-0 lg:top-0 lg:h-screen lg:z-auto
          w-64
        `}
      >
        <div className="p-6 border-b border-[#E3E3E3] flex justify-between items-center">
          <h2 className="text-3xl font-bold font-magnolia text-white tracking-wide mb-2">Empathic Actions</h2>
          {/* Botón cerrar móvil */}
          <button 
            onClick={onToggle}
            className="lg:hidden text-white hover:text-[#FFC401] transition-colors ml-auto"
          >
            <MdClose size={24} />
          </button>
        </div>
        <nav className="flex-1 py-8 flex flex-col gap-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => {
                // Cerrar sidebar en móviles al hacer clic en un enlace
                if (window.innerWidth < 1024) {
                  onToggle();
                }
              }}
              className={`flex items-center gap-4 px-4 py-3 text-white text-lg font-semibold rounded-l-full transition-all duration-200 group
                ${pathname === item.path ? 'bg-[#FFC401] text-[#02A9A9] shadow-md' : 'hover:bg-[#FFC401] hover:text-[#02A9A9]'}
              `}
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar; 