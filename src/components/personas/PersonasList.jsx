import { usePersonas, usePagination } from '@/hooks';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Pagination from '@/components/ui/Pagination';
import { useState, useEffect } from 'react';

const PersonasList = ({ onEdit, onDelete, refresh }) => {
  const { personas, loading, error, deletePersona, fetchPersonas } = usePersonas();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Datos de prueba para verificar la paginación
  const testData = [
    { id: 1, dni: '12345678', full_name: 'Juan Pérez', email: 'juan@test.com', phone_number: '123-456-7890', age: 25 },
    { id: 2, dni: '23456789', full_name: 'María García', email: 'maria@test.com', phone_number: '234-567-8901', age: 30 },
    { id: 3, dni: '34567890', full_name: 'Carlos López', email: 'carlos@test.com', phone_number: '345-678-9012', age: 28 },
    { id: 4, dni: '45678901', full_name: 'Ana Rodríguez', email: 'ana@test.com', phone_number: '456-789-0123', age: 35 },
    { id: 5, dni: '56789012', full_name: 'Luis Martínez', email: 'luis@test.com', phone_number: '567-890-1234', age: 27 },
    { id: 6, dni: '67890123', full_name: 'Sofia Torres', email: 'sofia@test.com', phone_number: '678-901-2345', age: 32 },
    { id: 7, dni: '78901234', full_name: 'Diego Silva', email: 'diego@test.com', phone_number: '789-012-3456', age: 29 },
    { id: 8, dni: '89012345', full_name: 'Carmen Ruiz', email: 'carmen@test.com', phone_number: '890-123-4567', age: 31 },
    { id: 9, dni: '90123456', full_name: 'Roberto Vega', email: 'roberto@test.com', phone_number: '901-234-5678', age: 26 },
    { id: 10, dni: '01234567', full_name: 'Patricia Morales', email: 'patricia@test.com', phone_number: '012-345-6789', age: 33 },
    { id: 11, dni: '11111111', full_name: 'Miguel Herrera', email: 'miguel@test.com', phone_number: '111-111-1111', age: 34 },
    { id: 12, dni: '22222222', full_name: 'Elena Castro', email: 'elena@test.com', phone_number: '222-222-2222', age: 28 },
  ];
  
  // Usar datos de prueba si no hay personas reales
  const dataToUse = personas.length > 0 ? personas : testData;
  
  // Debug: mostrar los datos que llegan
  // console.log('Datos en PersonasList:', {
  //   personas: personas,
  //   dataToUse: dataToUse,
  //   primeraPersona: dataToUse[0]
  // });
  
  const {
    currentPage,
    paginatedData,
    totalPages,
    totalItems,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage,
    hasPrevPage
  } = usePagination(dataToUse, itemsPerPage);

  // Escuchar cambios en el prop refresh para actualizar la lista
  useEffect(() => {
    if (refresh !== undefined) {
      fetchPersonas();
    }
  }, [refresh, fetchPersonas]);

  if (loading) return <div className="text-[#02A9A9]">Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  // Debug info
  // console.log('PersonasList Debug:', {
  //   personasCount: personas.length,
  //   testDataCount: testData.length,
  //   dataToUseCount: dataToUse.length,
  //   paginatedDataCount: paginatedData.length,
  //   currentPage,
  //   totalPages,
  //   itemsPerPage,
  //   totalItems
  // });

  return (
    <div className="bg-white shadow-lg rounded-xl border border-[#E3E3E3] overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#02A9A9]">Lista de Personas</h2>
{/*           <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-600">Mostrar:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#02A9A9] focus:border-transparent"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-600">registros</span>
            </div>
            <div className="text-sm text-gray-600">
              Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, totalItems)} de {totalItems} registros
            </div>
          </div> */}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-[#02A9A9] to-[#009e9e] text-white">
                <th className="px-4 py-3 font-bold text-center">DNI</th>
                <th className="px-4 py-3 font-bold text-center">Nombre Completo</th>
                <th className="px-4 py-3 font-bold text-center">Email</th>
                <th className="px-4 py-3 font-bold text-center">Teléfono</th>
                <th className="px-4 py-3 font-bold text-center">Edad</th>
                <th className="px-4 py-3 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((persona, idx) => (
                <tr key={persona.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FB]'}>
                  <td className="px-4 py-3 text-[#02A9A9] font-medium text-center">{persona.dni}</td>
                  <td className="px-4 py-3 text-[#02A9A9] font-medium">{persona.full_name}</td>
                  <td className="px-4 py-3 text-[#02A9A9] font-medium">{persona.email}</td>
                  <td className="px-4 py-3 text-[#02A9A9] font-medium text-center">{persona.phone_number}</td>
                  <td className="px-4 py-3 text-[#02A9A9] font-medium text-center">{persona.age}</td>
                  <td className="px-4 py-3 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit ? onEdit(persona) : null}
                      className="bg-[#02A9A9] text-white hover:bg-[#FFC401] hover:text-[#02A9A9] p-2 rounded-full shadow transition-colors flex items-center justify-center"
                      title="Editar"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button
                      onClick={() => onDelete ? onDelete(persona, deletePersona) : deletePersona(persona.id)}
                      className="bg-[#02A9A9] text-white hover:bg-[#FFC401] hover:text-[#02A9A9] p-2 rounded-full shadow transition-colors flex items-center justify-center"
                      title="Eliminar"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/*/!* Información de depuración *!/*/}
        {/*<div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm">*/}
        {/*  <p><strong>Debug Info:</strong></p>*/}
        {/*  <p>Total personas reales: {personas.length}</p>*/}
        {/*  <p>Datos de prueba: {testData.length}</p>*/}
        {/*  <p>Datos en uso: {dataToUse.length}</p>*/}
        {/*  <p>Personas en página actual: {paginatedData.length}</p>*/}
        {/*  <p>Página actual: {currentPage}</p>*/}
        {/*  <p>Total páginas: {totalPages}</p>*/}
        {/*  <p>Registros por página: {itemsPerPage}</p>*/}
        {/*  <p>Total registros: {totalItems}</p>*/}
        {/*</div>*/}

        {/* Paginación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onNext={nextPage}
          onPrev={prevPage}
          onFirst={goToFirstPage}
          onLast={goToLastPage}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </div>
  );
};

export default PersonasList; 