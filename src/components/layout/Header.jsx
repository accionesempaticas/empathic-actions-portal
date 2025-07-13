import { MdMenu } from 'react-icons/md';

const Header = ({ onMenuClick }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur shadow-md px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-[#02A9A9] hover:bg-[#02A9A9] hover:text-white transition-colors"
        >
          <MdMenu size={24} />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold font-magnolia text-[#02A9A9]">Portal de Voluntariado</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="bg-[#FFC401] p-2 rounded-full text-[#02A9A9] hover:bg-[#02A9A9] hover:text-white transition-colors font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-[#02A9A9]">
          🔔
        </button>
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#02A9A9] flex items-center justify-center text-white font-bold border-2 border-[#FFC401] shadow">
            U
          </div>
          <span className="hidden sm:inline text-[#02A9A9] font-semibold">Usuario</span>
        </div>
      </div>
    </header>
  );
};

export default Header; 