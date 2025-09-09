const Footer = () => {
  return (
      <footer className="backdrop-blur-md bg-white/70 border-t border-[#E3E3E3] shadow-inner px-6 py-6 mt-1 w-full">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 text-center lg:text-left">
          {/* Marca y derechos */}
          <p className="text-sm text-[#02A9A9]">
            © {new Date().getFullYear()}{' '}
            <span className="font-bold text-[#FFC401]">Empathic Actions</span>. Todos los derechos reservados.
          </p>

          {/* Enlaces */}
          <div className="flex gap-6 flex-wrap justify-center">
            <a
                href="#"
                className="transition-all text-sm font-medium text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]"
            >
              Términos
            </a>
            <a
                href="#"
                className="transition-all text-sm font-medium text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]"
            >
              Privacidad
            </a>
            <a
                href="#"
                className="transition-all text-sm font-medium text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]"
            >
              Contacto
            </a>
          </div>
        </div>
      </footer>
  );
};

export default Footer; 