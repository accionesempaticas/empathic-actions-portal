import api from './api';

class ApiProvider {
  static async getUsers() {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}

export default ApiProvider;
