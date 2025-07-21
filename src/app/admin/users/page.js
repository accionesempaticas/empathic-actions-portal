'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import UserManagement from '@/components/admin/UserManagement';
import Modal from "@/components/ui/Modal";
import {PersonaForm, PersonasList} from "@/components/personas";
import EliminarForm from "@/components/personas/ElmininarForm";
import Table from "@/components/ui/table";

const data = [
];
const columns = [
    {
        title: 'ID',
        dataField: 'id',
        columnStyle: (value, index, row) => ({
            color: row.errors?.length > 0 ? 'red' : 'inherit',
        }),
        columnRender: (value) => value,
    },
    {
        title: 'Nombre',
        dataField: 'name',
        columnRender: (value) => <span className="capitalize">{value}</span>,
    },
    {
        title: 'Email',
        dataField: 'email',
    },
    {
        title: 'Estado',
        dataField: 'status',
        columnRender: (value) => (
            <span className={`px-2 py-1 rounded-full text-white text-xs ${value === 'Activo' ? 'bg-green-500' : 'bg-red-500'}`}>
        {value}
      </span>
        ),
    }
];


export default function UsersPage() {
    const {user, loading} = useAuth();
    const router = useRouter();
    /*
      useEffect(() => {
        if (!loading && (!user || user.role !== 'admin')) {
          router.push('/login');
        }
      }, [user, loading, router]);

      if (loading) {
        return <p>Loading...</p>;
      }

      if (!user || user.role !== 'admin') {
        return null; // Or a message indicating unauthorized access
      }*/

    const [isDeleting, setIsDeleting] = useState(false);

    const [showForm, setShowForm] = useState(false);
    const [personaToEdit, setPersonaToEdit] = useState(null);
    const [refreshList, setRefreshList] = useState(false);

    // Función para abrir el modal en modo crear
    const handleNuevaPersona = () => {
        setPersonaToEdit(null);
        setShowForm(true);
    };

    // Función para abrir el modal en modo editar
    const handleEditarPersona = (persona) => {
        setPersonaToEdit(persona);
        setShowForm(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setShowForm(false);
        setPersonaToEdit(null);
    };

    // Función para refrescar la lista después de crear/editar/eliminar
    const handleRefreshList = () => setRefreshList((r) => !r);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2; // Items por página

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Aquí iría tu lógica de fetch si usas paginación remota
        console.log('Nueva página seleccionada:', page);
    };

    const handleEdit = (item) => {
        alert(`Editar: ${item.name}`);
    };

    const handleDelete = (item) => {
        alert(`Eliminar: ${item.name}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-magnolia" style={{color: '#02A9A9'}}>Gestión de Personas</h1>
                <button
                    onClick={handleNuevaPersona}
                    className="px-4 py-2 bg-[#02A9A9] hover:bg-[#FFC401] text-white hover:text-[#02A9A9] rounded-md font-semibold shadow transition-colors"
                >
                    Nueva Persona
                </button>
            </div>

            <Modal isOpen={showForm} onClose={handleCloseModal}
                   title={personaToEdit ? "Editar Persona" : isDeleting ? "Confirmar Eliminación" : "Agregar Persona"}>
                {!isDeleting ?
                    <PersonaForm
                        initialData={personaToEdit}
                        onSubmit={async (data) => {
                            // Aquí irá la lógica para crear/editar
                            // Si personaToEdit existe, es edición; si no, es creación
                            // Puedes llamar a tu servicio aquí
                            setShowForm(false);
                            setPersonaToEdit(null);
                            handleRefreshList();
                        }}
                    /> : <EliminarForm onClose={(e) => {
                        handleCloseModal(e);
                        setIsDeleting(false);
                    }} onSubmit={async (data) => {
                        // Aquí irá la lógica para eliminar
                        // Puedes llamar a tu servicio aquí
                        setShowForm(false);
                        setPersonaToEdit(null);
                        handleRefreshList();
                    }}></EliminarForm>}
            </Modal>
            <Table
                columnsConfig={columns}
                items={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)} // paginado local
                pageSize={pageSize}
                total={data.length}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onEdit={handleEdit}
                onDelete={handleDelete}
                showActions
            />

            <PersonasList
                onEdit={handleEditarPersona}
                onDelete={async (persona, deletePersona) => {
                    setIsDeleting(true);
                    setShowForm(true);
                    /*if (window.confirm(`¿Seguro que deseas eliminar a ${persona.full_name}?`)) {
                      await deletePersona(persona.id);
                      handleRefreshList();
                    }*/
                }}
                refresh={refreshList}
            />
        </div>
    );
}