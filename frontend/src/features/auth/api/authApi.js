import apiClient from '../../../lib/apiClient';

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },
  register: async (credentials) => {
    const { data } = await apiClient.post('/auth/register', credentials);
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },
  me: async () => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};
