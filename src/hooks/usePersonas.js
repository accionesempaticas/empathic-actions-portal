import { useState, useEffect, useCallback } from 'react';
import { personasService } from '@/services';

export const usePersonas = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Permitir filtros opcionales
  const fetchPersonas = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await personasService.getAllPeople(filters);
      setPersonas(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching personas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPersona = useCallback(async (personaData) => {
    try {
      setLoading(true);
      setError(null);
      const newPersona = await personasService.createPerson(personaData);
      setPersonas(prev => [...prev, newPersona]);
      return newPersona;
    } catch (err) {
      setError(err.message);
      console.error('Error creating persona:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePersona = useCallback(async (id, personaData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedPersona = await personasService.updatePerson(id, personaData);
      setPersonas(prev => prev.map(persona => 
        persona.id === id ? updatedPersona : persona
      ));
      return updatedPersona;
    } catch (err) {
      setError(err.message);
      console.error('Error updating persona:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePersona = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      await personasService.deletePerson(id);
      setPersonas(prev => prev.filter(persona => persona.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting persona:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener una persona por ID
  const getPersonaById = useCallback(async (id) => {
    try {
      return await personasService.getPersonById(id);
    } catch (err) {
      setError(err.message);
      console.error('Error getting persona by ID:', err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

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