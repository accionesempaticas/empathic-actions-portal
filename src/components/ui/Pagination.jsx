import React from 'react';
import {
    FaChevronLeft,
    FaChevronRight,
    FaAngleDoubleLeft,
    FaAngleDoubleRight
} from 'react-icons/fa';

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
    const maxVisiblePages = 5;

    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else if (currentPage <= 3) {
            pages.push(1, 2, 3, 4, '...', totalPages);
        } else if (currentPage >= totalPages - 2) {
            pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
        }

        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between items-center px-4 py-3 bg-white border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-700 mb-2 sm:mb-0">
                <span className="mr-2">Página</span>
                <span className="font-medium mr-1">{currentPage}</span>
                <span className="mx-1">de</span>
                <span className="font-medium">{totalPages}</span>
            </div>

            <div className="flex items-center space-x-1">
                <button
                    onClick={() => hasPrevPage && onFirst()}
                    disabled={!hasPrevPage}
                    className="p-2 text-gray-500 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Primera página"
                    aria-label="Primera página"
                >
                    <FaAngleDoubleLeft size={14} />
                </button>

                <button
                    onClick={() => hasPrevPage && onPrev()}
                    disabled={!hasPrevPage}
                    className="p-2 text-gray-500 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Página anterior"
                    aria-label="Página anterior"
                >
                    <FaChevronLeft size={14} />
                </button>

                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={page === '...'}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors
              ${page === currentPage
                            ? 'bg-primary-400 text-white'
                            : page === '...'
                                ? 'text-gray-400 cursor-default'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-primary-400'}`}
                        aria-current={page === currentPage ? 'page' : undefined}
                        aria-label={typeof page === 'number' ? `Ir a página ${page}` : 'Separador de páginas'}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => hasNextPage && onNext()}
                    disabled={!hasNextPage}
                    className="p-2 text-gray-500 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Página siguiente"
                    aria-label="Página siguiente"
                >
                    <FaChevronRight size={14} />
                </button>

                <button
                    onClick={() => hasNextPage && onLast()}
                    disabled={!hasNextPage}
                    className="p-2 text-gray-500 hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Última página"
                    aria-label="Última página"
                >
                    <FaAngleDoubleRight size={14} />
                </button>

                {/* Selector de página directa */}
                <select
                    value={currentPage}
                    onChange={(e) => onPageChange(Number(e.target.value))}
                    className="ml-4 border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-400"
                >
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <option key={page} value={page}>
                            Página {page}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Pagination;
