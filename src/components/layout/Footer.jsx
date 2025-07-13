const Footer = () => {
  return (
    <footer className="bg-[#F8F9FB] py-6 mt-12 w-full ml-64">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
        <p className="text-sm text-[#02A9A9] text-center">
          © {new Date().getFullYear()} <span className="font-bold font-magnolia text-[#FFC401]">Empathic Actions</span>. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          <a href="#" className="transition-all font-semibold text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]">Términos</a>
          <a href="#" className="transition-all font-semibold text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]">Privacidad</a>
          <a href="#" className="transition-all font-semibold text-[#02A9A9] hover:text-[#FFC401] underline underline-offset-4 decoration-[#02A9A9] hover:decoration-[#FFC401]">Contacto</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 