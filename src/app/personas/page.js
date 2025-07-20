'use client';

import { PersonasList, PersonaForm } from '@/components/personas';
import { MainLayout } from '@/components/layout';
import { useState } from 'react';
import Modal from '@/components/ui/Modal';

export default function PersonasPage() {
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold font-magnolia" style={{ color: '#02A9A9' }}>Gestión de Personas</h1>
          <button
            onClick={handleNuevaPersona}
            className="px-4 py-2 bg-[#02A9A9] hover:bg-[#FFC401] text-white hover:text-[#02A9A9] rounded-md font-semibold shadow transition-colors"
          >
            Nueva Persona
          </button>
        </div>

        <Modal isOpen={showForm} onClose={handleCloseModal} title={personaToEdit ? "Editar Persona" : "Agregar Persona"}>
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
          />
        </Modal>

        <PersonasList
          onEdit={handleEditarPersona}
          onDelete={async (persona, deletePersona) => {
            if (window.confirm(`¿Seguro que deseas eliminar a ${persona.full_name}?`)) {
              await deletePersona(persona.id);
              handleRefreshList();
            }
          }}
          refresh={refreshList}
        />
      </div>
    </MainLayout>
  );
} 