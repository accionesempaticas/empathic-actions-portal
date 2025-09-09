import { FaEdit, FaTrash } from 'react-icons/fa';
import React from 'react';
import Pagination from "@/components/ui/Pagination";

const Table = ({
                   columnsConfig = [],
                   items = [],
                   pageSize = 10,
                   total = 0,
                   currentPage = 1,
                   onPageChange = () => {},
                   onEdit,
                   onDelete,
                   showActions = false,
               }) => {
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="bg-white shadow-xl rounded-xl border border-[#E3E3E3] overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-primary-400">Resultados</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left rounded-xl">
                        <thead>
                        <tr className="bg-gradient-to-r from-primary-400 to-[#009e9e] text-white">
                            {columnsConfig.map((col, idx) => (
                                <th
                                    key={idx}
                                    className="px-4 py-3 font-bold text-center whitespace-nowrap"
                                >
                                    {col.title}
                                </th>
                            ))}
                            {showActions && (
                                <th className="px-4 py-3 font-bold text-center">Acciones</th>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {items.length > 0 ? (
                            items.map((row, rowIndex) => (
                                <tr
                                    key={row.id || rowIndex}
                                    className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}
                                >
                                    {columnsConfig.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-4 py-3 text-primary-400 font-medium text-center whitespace-nowrap"
                                            style={col.columnStyle?.(row[col.dataField], rowIndex, row)}
                                        >
                                            {col.columnRender
                                                ? col.columnRender(row[col.dataField], rowIndex, row)
                                                : row[col.dataField] ?? '-'}
                                        </td>
                                    ))}
                                    {showActions && (
                                        <td className="px-4 py-3 flex gap-2 justify-center">
                                            <button
                                                onClick={() => onEdit?.(row)}
                                                className="bg-primary-400 text-white hover:bg-secondary-400 hover:text-primary-400 p-2 rounded-full shadow transition-colors"
                                                title="Editar"
                                            >
                                                <FaEdit size={16} />
                                            </button>
                                            <button
                                                onClick={() => onDelete?.(row)}
                                                className="bg-primary-400 text-white hover:bg-secondary-400 hover:text-primary-400 p-2 rounded-full shadow transition-colors"
                                                title="Eliminar"
                                            >
                                                <FaTrash size={16} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columnsConfig.length + (showActions ? 1 : 0)}
                                    className="text-center py-6 text-gray-400"
                                >
                                    Sin datos disponibles.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {total > pageSize && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        hasPrevPage={currentPage > 1}
                        hasNextPage={currentPage < totalPages}
                        onPageChange={onPageChange}
                        onPrev={() => onPageChange(currentPage - 1)}
                        onNext={() => onPageChange(currentPage + 1)}
                        onFirst={() => onPageChange(1)}
                        onLast={() => onPageChange(totalPages)}
                    />
                )}
            </div>
        </div>
    );
};

export default Table;
