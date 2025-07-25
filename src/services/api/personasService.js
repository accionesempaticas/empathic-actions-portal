import api from "@/api/api";

const personasService = {
  // Obtener todas las personas o filtrar
  getAllPeople: async (params = {}) => {
    try {
      const response = await api.get('/people', { params });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener personas: ' + error.message);
    }
  },

  // Obtener una persona por ID
  getPersonById: async (id) => {
    try {
      const response = await api.get(`/people/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener persona ${id}: ${error.message}`);
    }
  },

  // Crear una nueva persona
  createPerson: async (personData) => {
    try {
      console.log('Datos enviados al backend (createPerson):', personData); // Debug
      const response = await api.post('/people', personData);
      console.log('Respuesta completa del backend:', response); // Debug completo
      console.log('Respuesta del backend (data):', response.data); // Debug data
      
      // Si la respuesta tiene una estructura anidada, extraer los datos
      const result = response.data.data || response.data;
      console.log('Datos extraídos:', result); // Debug datos extraídos
      
      return result;
    } catch (error) {
      console.error('Error completo:', error); // Debug error completo
      throw new Error('Error al crear persona: ' + error.message);
    }
  },

  // Actualizar una persona
  updatePerson: async (id, personData) => {
    try {
      const response = await api.put(`/people/${id}`, personData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar persona ${id}: ${error.message}`);
    }
  },

  // Actualizar parcialmente una persona
  patchPerson: async (id, partialData) => {
    try {
      const response = await api.patch(`/people/${id}`, partialData);
      return response.data;
    } catch (error) {
      throw new Error(`Error al actualizar parcialmente persona ${id}: ${error.message}`);
    }
  },

  // Eliminar una persona
  deletePerson: async (id) => {
    try {
      await api.delete(`/people/${id}`);
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar persona ${id}: ${error.message}`);
    }
  }
};

export default personasService; 