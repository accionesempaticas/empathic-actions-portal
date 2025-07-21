import { MdMenu } from 'react-icons/md';
import {useAuth} from "@/contexts/AuthContext";
const Header = ({ onMenuClick }) => {
    const { user, loading } = useAuth();

    if (loading || !user) return null;

    return (
      <header className="sticky top-4 z-30 mx-4 lg:mx-6 bg-white/80 backdrop-blur-md border border-primary-100 shadow-xl rounded-2xl px-6 py-4 flex items-center justify-between">
        {/* Botón de menú (solo visible en móviles) */}
        <div className="flex items-center gap-4">
          <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-md text-primary-700 hover:bg-primary-600 hover:text-white transition-colors"
          >
            <MdMenu size={24} />
          </button>
          <h1 className="text-xl lg:text-2xl font-bold font-magnolia text-primary-700">
            Portal de Voluntariado
          </h1>
        </div>

        {/* Área de usuario y notificaciones */}
        <div className="flex items-center gap-4">
          <button className="relative bg-primary-100 p-2 rounded-full text-primary-700 hover:bg-primary-600 hover:text-white transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary-500">
            🔔
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold border-2 border-yellow-400 shadow-md">
              U
            </div>
            <span className="hidden sm:inline text-primary-700 font-medium">{user.first_name}</span>
          </div>
        </div>
      </header>
  );
};

export default Header; 