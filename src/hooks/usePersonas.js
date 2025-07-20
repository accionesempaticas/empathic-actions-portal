import { useState, useEffect } from 'react';
import { personasService } from '@/services';

export const usePersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Permitir filtros opcionales
  const fetchPersonas = async (filters = {}) => {
    try {
      setLoading(true);
      const data = await personasService.getAllPeople(filters);
      setPersonas(Array.isArray(data) ? data : data?.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPersona = async (personaData) => {
    try {
      const newPersona = await personasService.createPerson(personaData);
      setPersonas(prev => [...prev, newPersona]);
      return newPersona;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePersona = async (id, personaData) => {
    try {
      const updatedPersona = await personasService.updatePerson(id, personaData);
      setPersonas(prev => prev.map(persona => 
        persona.id === id ? updatedPersona : persona
      ));
      return updatedPersona;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletePersona = async (id) => {
    try {
      await personasService.deletePerson(id);
      setPersonas(prev => prev.filter(persona => persona.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Obtener una persona por ID
  const getPersonaById = async (id) => {
    try {
      return await personasService.getPersonById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  return {
    personas,
    loading,
    error,
    createPersona,
    updatePersona,
    deletePersona,
    getPersonaById,
    fetchPersonas
  };
}; 