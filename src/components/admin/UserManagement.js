'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useUsers } from '@/contexts/UsersContext';
import FileViewer from './FileViewer';
import { getAreas, getGroupsByArea } from '@/utils/areasAndGroups';
import * as XLSX from 'xlsx';

export default function UserManagement() {
    const { users, loading, error, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
    const { user: authUser, loading: authLoading } = useAuth();
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        if (authUser && authUser.role === 'admin' && users.length === 0) {
            fetchUsers();
        }
    }, [authUser]);

    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUserForView, setSelectedUserForView] = useState(null);
    const [showFileViewer, setShowFileViewer] = useState(false);
    const [selectedUserForFiles, setSelectedUserForFiles] = useState(null);
    
    // Filter states
    const [nameFilter, setNameFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState('');
    const [groupFilter, setGroupFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    
    // Get areas for dropdown
    const areas = getAreas();
    const [availableGroups, setAvailableGroups] = useState([]);
    
    // Update groups when area changes
    useEffect(() => {
        if (areaFilter) {
            const groups = getGroupsByArea(areaFilter);
            setAvailableGroups(groups);
            // Clear group filter if current group is not in new area
            if (groupFilter && !groups.includes(groupFilter)) {
                setGroupFilter('');
            }
        } else {
            setAvailableGroups([]);
            setGroupFilter('');
        }
    }, [areaFilter, groupFilter]);
    const [formData, setFormData] = useState({
        document_type: 'DNI',
        document_number: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        role: 'user',
        region: '',
        career: '',
        experience_years: '',
        other_volunteering: '',
        area: '',
        group: '',
        user_status: 'PENDIENTE',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'area') {
            setGroups(getGroupsByArea(value));
            setFormData(prev => ({ ...prev, group: '' }));
        }
    };

    const handleExportData = () => {
        try {
            // Obtener usuarios filtrados (todos los usuarios que coincidan con los filtros actuales)
            const usersToExport = Array.isArray(users) ? users.filter(user => {
                const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
                const matchesName = nameFilter === '' || fullName.includes(nameFilter.toLowerCase());
                const matchesArea = areaFilter === '' || user.area === areaFilter;
                const matchesGroup = groupFilter === '' || user.group === groupFilter;
                const matchesStatus = statusFilter === '' || user.user_status === statusFilter;
                
                return matchesName && matchesArea && matchesGroup && matchesStatus;
            }) : [];

            // Preparar datos para Excel
            const excelData = usersToExport.map(user => ({
                'ID': user.id || '',
                'Tipo Documento': user.document_type || '',
                'Número Documento': user.document_number || '',
                'Nombres': user.first_name || '',
                'Apellidos': user.last_name || '',
                'Nacionalidad': user.nationality || '',
                'Fecha Nacimiento': user.date_of_birth || '',
                'Teléfono': user.phone_number || '',
                'Email': user.email || '',
                'Género': user.gender || '',
                'Teléfono Familiar': user.family_phone_number || '',
                'LinkedIn': user.linkedin || '',
                'País': user.location?.country || '',
                'Región': user.location?.region || '',
                'Provincia': user.location?.province || '',
                'Distrito': user.location?.district || '',
                'Dirección': user.location?.address || '',
                'Grado Académico': user.formation?.academic_degree || '',
                'Carrera': user.formation?.career || '',
                'Centro Formación': user.formation?.formation_center || '',
                'Años Experiencia': user.experience?.experience_time || '',
                'Otros Voluntariados': user.experience?.other_volunteer_work === 1 ? 'Sí' : user.experience?.other_volunteer_work === 0 ? 'No' : '',
                'Área': user.area || '',
                'Grupo': user.group || '',
                'Estado': user.user_status || '',
                'Rol': user.role || '',
                'Fecha Creación': user.created_at || '',
                'Última Actualización': user.updated_at || ''
            }));

            // Crear workbook de Excel
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

            // Generar archivo Excel y descargarlo
            const fileName = `usuarios_${new Date().toISOString().split('T')[0]}.xlsx`;
            XLSX.writeFile(workbook, fileName);

            toast.success('Archivo Excel descargado exitosamente');
        } catch (error) {
            console.error('Error al exportar datos:', error);
            toast.error('Error al generar el archivo Excel');
        }
    };

    const handleAddEditSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const updateData = {
                    document_type: formData.document_type,
                    document_number: formData.document_number,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone_number: formData.phone_number,
                    email: formData.email,
                    role: formData.role,
                    area: formData.area,
                    group: formData.group,
                    user_status: formData.user_status,
                    location: {
                        region: formData.region || null
                    },
                    formation: {
                        career: formData.career || null
                    },
                    experience: {
                        experience_time: formData.experience_years || null,
                        other_volunteer_work: formData.other_volunteering || null
                    }
                };

                if (formData.password && formData.password.trim() !== '') {
                    updateData.password = formData.password;
                }

                console.log('Updating user with data:', updateData);
                const updatedUser = await updateUser(currentUser.id, updateData);
                console.log('User updated:', updatedUser);
                toast.success("¡Usuario actualizado exitosamente!");
            } else {
                const createData = {
                    ...formData,
                    location: {
                        region: formData.region || null
                    },
                    formation: {
                        career: formData.career || null
                    },
                    experience: {
                        experience_time: formData.experience_years || null,
                        other_volunteer_work: formData.other_volunteering || null
                    }
                };
                await createUser(createData);
                toast.success("¡Usuario creado exitosamente!");
            }
            resetFormAndCloseModal();
            fetchUsers(); // Refresh the list after successful update
        } catch (err) {
            console.error("Error saving user:", err);
            toast.error(err.response?.data?.message || "Error al guardar usuario. Verifica los datos.");
        }
    };

    const handleEditClick = (user) => {
        console.log('Usuario seleccionado para editar:', user);
        setCurrentUser(user);
        const userArea = user.area || '';
        setFormData({
            document_type: user.document_type || 'DNI',
            document_number: user.document_number || '',
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            phone_number: user.phone_number || '',
            email: user.email || '',
            role: user.role || 'user',
            password: '',
            region: user.location?.region || '',
            career: user.formation?.career || '',
            experience_years: user.experience?.experience_time || '',
            other_volunteering: user.experience?.other_volunteer_work || '',
            area: userArea,
            group: user.group || '',
            user_status: user.user_status || 'PENDIENTE',
        });
        if (userArea) {
            setGroups(getGroupsByArea(userArea));
        } else {
            setGroups([]);
        }
        setIsEditing(true);
        setShowModal(true);
    };

    const handleViewClick = (user) => {
        setSelectedUserForView(user);
        setShowViewModal(true);
    };

    const closeViewModal = () => {
        setShowViewModal(false);
        setSelectedUserForView(null);
    };

    const handleViewFiles = (user) => {
        setSelectedUserForFiles(user);
        setShowFileViewer(true);
    };

    const resetFormAndCloseModal = () => {
        setFormData({
            document_type: 'DNI',
            document_number: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            email: '',
            password: '',
            role: 'user',
            region: '',
            career: '',
            experience_years: '',
            other_volunteering: '',
            area: '',
            group: '',
            user_status: 'PENDIENTE',
        });
        setCurrentUser(null);
        setIsEditing(false);
        setShowModal(false);
        setGroups([]);
    };

    // Filter users based on search criteria
    const filteredUsers = Array.isArray(users) ? users.filter(user => {
        const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
        const matchesName = nameFilter === '' || fullName.includes(nameFilter.toLowerCase());
        const matchesArea = areaFilter === '' || user.area === areaFilter;
        const matchesGroup = groupFilter === '' || user.group === groupFilter;
        const matchesStatus = statusFilter === '' || user.user_status === statusFilter;
        
        return matchesName && matchesArea && matchesGroup && matchesStatus;
    }) : [];
    
    // Pagination calculations
    const totalRecords = filteredUsers.length;
    const totalPages = Math.ceil(totalRecords / recordsPerPage);
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [nameFilter, areaFilter, groupFilter, statusFilter]);

    if (authLoading || (authUser && authUser.role !== 'admin')) {
        return <div className="text-center py-4">Cargando o no autorizado...</div>;
    }

    if (loading) return <div className="text-center py-4">Cargando usuarios...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Encabezado principal */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-primary-100 mb-8">
                    <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight text-center">
                            Gestión de Personas
                        </h1>
                        <p className="text-primary-100 text-center mt-2 text-lg">
                            Sistema de administración de usuarios y voluntarios
                        </p>
                    </div>
                    
                    {/* Contenido principal */}
                    <div className="p-8">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-xl">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <span className="text-red-500 text-xl">!</span>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-red-700 font-medium">Error: {error.message}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Botón para añadir nueva persona */}
                        <div className="flex justify-between items-center mb-8">
                            <div className="space-y-4">
                                {/* Filtros de búsqueda */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Nombre"
                                            value={nameFilter}
                                            onChange={(e) => setNameFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <select
                                            value={areaFilter}
                                            onChange={(e) => setAreaFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                                        >
                                            <option value="">Área</option>
                                            {areas.map((area, index) => (
                                                <option key={index} value={area}>
                                                    {area}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={groupFilter}
                                            onChange={(e) => setGroupFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                                            disabled={!areaFilter}
                                        >
                                            <option value="">Grupo</option>
                                            {availableGroups.map((group, index) => (
                                                <option key={index} value={group}>
                                                    {group}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm"
                                        >
                                            <option value="">Estado</option>
                                            <option value="ACTIVO">ACTIVO</option>
                                            <option value="INACTIVO">INACTIVO</option>
                                            <option value="PENDIENTE">PENDIENTE</option>
                                            <option value="RETIRADO">RETIRADO</option>
                                            <option value="BL">BL</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <div className="text-neutral-600">
                                        <span className="text-sm font-medium">
                                            Mostrando: <span className="font-bold text-primary-600">{startIndex + 1}-{Math.min(endIndex, totalRecords)}</span> de <span className="font-bold text-primary-600">{totalRecords}</span> registros filtrados ({Array.isArray(users) ? users.length : 0} total)
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <label className="text-sm font-medium text-gray-600">Mostrar:</label>
                                            <select
                                                value={recordsPerPage}
                                                onChange={(e) => {
                                                    setRecordsPerPage(Number(e.target.value));
                                                    setCurrentPage(1);
                                                }}
                                                className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                            >
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                            </select>
                                            <span className="text-sm font-medium text-gray-600">por página</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setNameFilter('');
                                                setAreaFilter('');
                                                setGroupFilter('');
                                                setStatusFilter('');
                                            }}
                                            className="text-sm text-primary-600 hover:text-primary-800 font-medium"
                                        >
                                            Limpiar filtros
                                        </button>
                                        <button
                                            onClick={handleExportData}
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
                                        >
                                            Descargar Excel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de usuarios */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-primary-100">
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                    <tr className="bg-gradient-to-r from-neutral-50 to-primary-50 border-b-2 border-primary-100">
                                        <th className="py-4 px-6 text-left text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="py-4 px-6 text-left text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Nombres
                                        </th>
                                        <th className="py-4 px-6 text-left text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Apellidos
                                        </th>
                                        <th className="py-4 px-6 text-left text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Email
                                        </th>
                                        <th className="py-4 px-6 text-center text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Rol
                                        </th>
                                        <th className="py-4 px-6 text-center text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th className="py-4 px-6 text-center text-sm font-extrabold text-neutral-700 uppercase tracking-wider">
                                            Acciones
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-neutral-200">
                                    {Array.isArray(paginatedUsers) && paginatedUsers.map((user, index) => (
                                        <tr key={user.id} className={`hover:bg-primary-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center">
                                                        <span className="text-xs font-bold text-primary-700">#{user.id}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="text-sm font-bold text-neutral-900">{user.first_name || 'N/A'}</div>
                                                <div className="text-xs text-neutral-500">{user.document_type} {user.document_number}</div>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="text-sm font-bold text-neutral-900">{user.last_name || 'N/A'}</div>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="text-sm text-neutral-900">{user.email}</div>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                                    user.role === 'admin' 
                                                        ? 'bg-secondary-200 text-secondary-800'
                                                        : 'bg-info-200 text-info-800'
                                                }`}>
                                                    {user.role === 'admin' ? 'Admin' : 'Usuario'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                                                    user.user_status === 'ACTIVO' ? 'bg-green-200 text-green-800' :
                                                    user.user_status === 'INACTIVO' ? 'bg-red-200 text-red-800' :
                                                    user.user_status === 'PENDIENTE' ? 'bg-yellow-200 text-yellow-800' :
                                                    user.user_status === 'RETIRADO' ? 'bg-gray-200 text-gray-800' :
                                                    user.user_status === 'BL' ? 'bg-black text-white' :
                                                    'bg-neutral-200 text-neutral-800'
                                                }`}>
                                                    {user.user_status || 'PENDIENTE'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleViewFiles(user)}
                                                        className="inline-flex items-center px-3 py-2 bg-success-500 hover:bg-success-600 text-white font-bold rounded-lg text-xs shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                                                        title="Ver archivos"
                                                    >
                                                        Archivos
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditClick(user)}
                                                        className="inline-flex items-center px-3 py-2 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-lg text-xs shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleViewClick(user)}
                                                        className="inline-flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-xs shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                                                    >
                                                        Ver datos
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedUsers.length === 0 && (
                                        <tr>
                                            <td colSpan="7" className="py-8 px-6 text-center text-gray-500">
                                                <div className="flex flex-col items-center space-y-2">
                                                    <div className="text-4xl">🔍</div>
                                                    <div className="text-lg font-medium">No se encontraron usuarios</div>
                                                    <div className="text-sm">Intenta ajustar los filtros de búsqueda</div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        {/* Paginación */}
                        {totalRecords > recordsPerPage && (
                            <div className="bg-white rounded-2xl shadow-xl mt-4 px-8 py-6 border border-primary-100">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-gray-700">
                                        Página <span className="font-medium">{currentPage}</span> de{' '}
                                        <span className="font-medium">{totalPages}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                                                currentPage === 1
                                                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            Anterior
                                        </button>
                                        
                                        {/* Números de página */}
                                        <div className="flex space-x-1">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                const pageNumber = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                                                if (pageNumber > totalPages) return null;
                                                
                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() => setCurrentPage(pageNumber)}
                                                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                                                            currentPage === pageNumber
                                                                ? 'bg-primary-500 text-white'
                                                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        {pageNumber}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                        
                                        <button
                                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 text-sm font-medium rounded-lg border ${
                                                currentPage === totalPages
                                                    ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                        >
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de Crear/Editar */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden border border-primary-200">
                        <div className="bg-primary-500 p-6">
                            <h3 className="text-2xl font-bold text-white text-center">
                                {isEditing ? 'Editar Persona' : 'Crear Nueva Persona'}
                            </h3>
                        </div>
                        <div className="p-8 max-h-[80vh] overflow-y-auto">
                        <form onSubmit={handleAddEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Columna 1 */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="document_type" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Tipo de Documento:
                                    </label>
                                    <select
                                        name="document_type"
                                        id="document_type"
                                        value={formData.document_type}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        required
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="CE">Carnet de Extranjería</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="document_number" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Número de Documento:
                                    </label>
                                    <input
                                        type="text"
                                        name="document_number"
                                        id="document_number"
                                        value={formData.document_number}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder={formData.document_type === 'DNI' ? 'Ingrese 8 dígitos' : 'Ingrese número de carnet'}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="first_name" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Nombres:
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        id="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ingrese los nombres"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Apellidos:
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        id="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ingrese los apellidos"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone_number" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Celular:
                                    </label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        id="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ingrese el número de celular"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="ejemplo@correo.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Columna 2 */}
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="region" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Región:
                                    </label>
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ingrese la región"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="career" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Carrera:
                                    </label>
                                    <input
                                        type="text"
                                        name="career"
                                        id="career"
                                        value={formData.career}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ingrese la carrera"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="experience_years" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Años de Experiencia:
                                    </label>
                                    <input
                                        type="text"
                                        name="experience_years"
                                        id="experience_years"
                                        value={formData.experience_years}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        placeholder="Ej: 1-2 años"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="other_volunteering" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Participación en otros voluntariados:
                                    </label>
                                    <select
                                        name="other_volunteering"
                                        id="other_volunteering"
                                        value={formData.other_volunteering}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                    >
                                        <option value="">Seleccione una opción</option>
                                        <option value="1">Sí</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="area" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Área:
                                    </label>
                                    <select
                                        name="area"
                                        id="area"
                                        value={formData.area}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                    >
                                        <option value="">Seleccione un área</option>
                                        {areas.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="group" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Grupo:
                                    </label>
                                    <select
                                        name="group"
                                        id="group"
                                        value={formData.group}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        disabled={!formData.area}
                                    >
                                        <option value="">Seleccione un grupo</option>
                                        {groups.map(group => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="role" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Rol:
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        required
                                    >
                                        <option value="user">Usuario</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="user_status" className="block text-sm font-semibold text-primary-700 mb-2">
                                        Estado:
                                    </label>
                                    <select
                                        name="user_status"
                                        id="user_status"
                                        value={formData.user_status}
                                        onChange={handleChange}
                                        className="w-full border-2 border-primary-200 rounded-xl shadow-sm p-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-300 bg-gray-50 focus:bg-white"
                                        required
                                    >
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="ACTIVO">ACTIVO</option>
                                        <option value="INACTIVO">INACTIVO</option>
                                        <option value="RETIRADO">RETIRADO</option>
                                        <option value="BL">BL</option>
                                    </select>
                                </div>
                            </div>

                            {/* Botones */}
                            <div className="md:col-span-2 flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                                <button
                                    type="button"
                                    onClick={resetFormAndCloseModal}
                                    className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-xl shadow-lg hover:bg-gray-500 transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    ❌ Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-600 transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    {isEditing ? 'Actualizar' : 'Crear'}
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Visualización de Datos */}
            {showViewModal && selectedUserForView && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden border border-primary-200 max-h-[90vh] overflow-y-auto">
                        <div className="bg-primary-500 p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold text-white">Datos del Usuario</h3>
                                <button
                                    onClick={closeViewModal}
                                    className="text-white hover:text-gray-200 text-2xl font-bold"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Datos Personales */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-primary-700 border-b border-primary-200 pb-2">Datos Personales</h4>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Tipo de Documento</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.document_type || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Número de Documento</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.document_number || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Nombres</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.first_name || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Apellidos</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.last_name || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                        <input
                                            type="email"
                                            value={selectedUserForView.email || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.phone_number || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Género</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.gender || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Nacionalidad</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.nationality || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Fecha de Nacimiento</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.date_of_birth || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Teléfono Familiar</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.family_phone_number || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.linkedin || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                </div>
                                
                                {/* Ubicación, Formación, Experiencia y Participación */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-primary-700 border-b border-primary-200 pb-2">Ubicación</h4>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">País</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.location?.country || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Región</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.location?.region || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Provincia</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.location?.province || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Distrito</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.location?.district || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Dirección</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.location?.address || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <h4 className="text-lg font-semibold text-primary-700 border-b border-primary-200 pb-2 mt-6">Formación</h4>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Grado Académico</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.formation?.academic_degree || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Carrera</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.formation?.career || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Centro de Formación</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.formation?.formation_center || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <h4 className="text-lg font-semibold text-primary-700 border-b border-primary-200 pb-2 mt-6">Experiencia</h4>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Años de Experiencia</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.experience?.experience_time || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Otros Voluntariados</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.experience?.other_volunteer_work === '1' ? 'Sí' : 'No'}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <h4 className="text-lg font-semibold text-primary-700 border-b border-primary-200 pb-2 mt-6">Participación</h4>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Área</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.area || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Grupo</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.group || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Rol</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.role || ''}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                                            readOnly
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-600 mb-1">Estado</label>
                                        <input
                                            type="text"
                                            value={selectedUserForView.user_status || 'PENDIENTE'}
                                            className={`w-full p-2 border border-gray-300 rounded-lg font-semibold ${
                                                selectedUserForView.user_status === 'ACTIVO' ? 'bg-green-100 text-green-800' :
                                                selectedUserForView.user_status === 'INACTIVO' ? 'bg-red-100 text-red-800' :
                                                selectedUserForView.user_status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                                selectedUserForView.user_status === 'RETIRADO' ? 'bg-gray-100 text-gray-800' :
                                                selectedUserForView.user_status === 'BL' ? 'bg-black text-white' :
                                                'bg-gray-50 text-gray-800'
                                            }`}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={closeViewModal}
                                    className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Visualización de Archivos */}
            {showFileViewer && selectedUserForFiles && (
                <FileViewer
                    person={selectedUserForFiles}
                    onClose={() => {
                        setShowFileViewer(false);
                        setSelectedUserForFiles(null);
                    }}
                />
            )}
        </div>
    );
}