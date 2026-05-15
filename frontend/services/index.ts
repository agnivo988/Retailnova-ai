import api from '../lib/api';

export const authService = {
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  signup: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export const aiService = {
  getChatResponse: async (message: string) => {
    const response = await api.post('/ai/chat', { message });
    return response.data;
  },
  getDemandForecast: async (category: string, currentStock: number) => {
    // This goes through the backend proxy or direct to AI service if configured
    const response = await api.post('/ai/demand-forecast', { category, current_stock: currentStock });
    return response.data;
  },
};

export const inventoryService = {
  getAll: async () => {
    const response = await api.get('/inventory');
    return response.data;
  },
};
