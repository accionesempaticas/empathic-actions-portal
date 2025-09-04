'use client';

import { PersonasList, PersonaForm } from '@/components/personas';
import { MainLayout } from '@/components/layout';
import { usePersonas } from '@/hooks';
import { useState, useCallback } from 'react';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

export default function PersonasPage() {
  const { createPersona, updatePersona, deletePersona } = usePersonas();
  const [showForm, setShowForm] = useState(false);
  const [personaToEdit, setPersonaToEdit] = useState(null);
  const [refreshList, setRefreshList] = useState(0);

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
  const handleRefreshList = useCallback(() => {
    setRefreshList(prev => prev + 1);
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmitForm = async (formData) => {
    console.log('Datos recibidos en handleSubmitForm:', formData); // Debug
    
    // Limpiar datos antes de enviar al backend
    const cleanedData = { ...formData };
    
    // Si el DNI está vacío, no enviarlo (para que no se convierta a null)
    if (!cleanedData.dni || cleanedData.dni.trim() === '') {
      delete cleanedData.dni;
    }
    
    // Si otros campos están vacíos, también limpiarlos
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '' || cleanedData[key] === null) {
        delete cleanedData[key];
      }
    });
    
    console.log('Datos limpios a enviar:', cleanedData); // Debug
    
    try {
      if (personaToEdit) {
        // Modo edición
        await updatePersona(personaToEdit.id, cleanedData);
        toast.success('Persona actualizada exitosamente');
      } else {
        // Modo creación
        await createPersona(cleanedData);
        toast.success('Persona creada exitosamente');
      }
      
      setShowForm(false);
      setPersonaToEdit(null);
      handleRefreshList();
    } catch (error) {
      toast.error(error.message || 'Error al procesar la solicitud');
      console.error('Error:', error);
    }
  };

  // Función para manejar la eliminación
  const handleDeletePersona = async (persona, deletePersona) => {
    if (window.confirm(`¿Seguro que deseas eliminar a ${persona.first_name} ${persona.last_name}?`)) {
      try {
        await deletePersona(persona.id);
        toast.success('Persona eliminada exitosamente');
        handleRefreshList();
      } catch (error) {
        toast.error(error.message || 'Error al eliminar la persona');
        console.error('Error:', error);
      }
    }
  };

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
            onSubmit={handleSubmitForm}
            onCancel={handleCloseModal}
          />
        </Modal>

        <PersonasList
          onEdit={handleEditarPersona}
          onDelete={handleDeletePersona}
          refresh={refreshList}
        />
      </div>
    </MainLayout>
  );
} 