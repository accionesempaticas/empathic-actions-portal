import React from 'react';

const Modal = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg mx-4 p-6 relative animate-fade-in">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#02A9A9] text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        {title && <h2 className="text-xl font-bold mb-4 text-[#02A9A9]">{title}</h2>}
        {children}
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeInModal 0.2s ease;
        }
        @keyframes fadeInModal {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Modal; 