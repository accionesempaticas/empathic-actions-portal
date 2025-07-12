import api from './api';

class ApiProvider {
  static async getUsers() {
    try {
      const response = await api.get('/people');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}

export default ApiProvider;
