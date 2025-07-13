import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onNext,
  onPrev,
  onFirst,
  onLast,
  hasNextPage,
  hasPrevPage
}) => {

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Siempre mostrar la paginación, incluso si solo hay una página
  // if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">

      <div className="flex items-center text-sm text-gray-700">
        <span className="mr-2">Página</span>
        <span className="font-medium">{currentPage}</span>
        <span className="mx-1">de</span>
        <span className="font-medium">{totalPages}</span>
      </div>


      <div className="flex items-center space-x-1">
        {/* Botón Primera Página */}
        <button
          onClick={onFirst}
          disabled={!hasPrevPage}
          className="p-2 text-gray-500 hover:text-[#02A9A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Primera página"
        >
          <FaAngleDoubleLeft size={14} />
        </button>

        {/* Botón Página Anterior */}
        <button
          onClick={onPrev}
          disabled={!hasPrevPage}
          className="p-2 text-gray-500 hover:text-[#02A9A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          <FaChevronLeft size={14} />
        </button>

        {/* Números de Página */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' ? onPageChange(page) : null}
              disabled={page === '...'}
              className={`
                px-3 py-2 text-sm font-medium rounded-lg transition-colors
                ${page === currentPage 
                  ? 'bg-[#02A9A9] text-white' 
                  : page === '...'
                    ? 'text-gray-400 cursor-default'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-[#02A9A9]'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Botón Página Siguiente */}
        <button
          onClick={onNext}
          disabled={!hasNextPage}
          className="p-2 text-gray-500 hover:text-[#02A9A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página siguiente"
        >
          <FaChevronRight size={14} />
        </button>

        {/* Botón Última Página */}
        <button
          onClick={onLast}
          disabled={!hasNextPage}
          className="p-2 text-gray-500 hover:text-[#02A9A9] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Última página"
        >
          <FaAngleDoubleRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;