import { MdMenu } from 'react-icons/md';
import {useAuth} from "@/contexts/AuthContext";
const Header = ({ onMenuClick }) => {
    const { user, loading } = useAuth();

    if (loading || !user) return null;

    return (
      <header className="sticky top-4 z-30 mx-4 lg:mx-6 bg-white/95 backdrop-blur-xl border border-primary-200 shadow-2xl rounded-3xl px-8 py-5 flex items-center justify-between">
        {/* Botón de menú (solo visible en móviles) */}
        <div className="flex items-center gap-4">
          <button
              onClick={onMenuClick}
              className="lg:hidden p-3 rounded-xl text-primary-700 hover:bg-primary-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <MdMenu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg">
              <span className="text-white text-xl">🌟</span>
            </div>
            <h1 className="text-xl lg:text-2xl font-extrabold bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">
              Portal de Voluntariado
            </h1>
          </div>
        </div>

        {/* Área de usuario y notificaciones */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-gradient-to-r from-primary-50 to-primary-100 px-4 py-2 rounded-2xl border border-primary-200 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold border-2 border-accent-400 shadow-lg">
              {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="hidden sm:block">
              <span className="text-primary-700 font-bold text-sm block">{user.full_name || 'Usuario'}</span>
              <span className="text-primary-500 text-xs font-medium block">{user.role === 'admin' ? 'Administrador' : 'Usuario'}</span>
            </div>
          </div>
        </div>
      </header>
  );
};

export default Header; 