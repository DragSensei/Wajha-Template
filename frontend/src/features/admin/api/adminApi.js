import apiClient from '../../../lib/apiClient';

export const adminApi = {
  getDashboard: async () => {
    const { data } = await apiClient.get('/admin/dashboard');
    return data;
  },
  getProducts: async () => {
    const { data } = await apiClient.get('/admin/products');
    return data;
  },
  saveProduct: async (productData) => {
    const { data } = await apiClient.post('/admin/products', productData);
    return data;
  },
  deleteProduct: async (id) => {
    const { data } = await apiClient.delete(`/admin/products/${id}`);
    return data;
  },
  getOrders: async () => {
    const { data } = await apiClient.get('/admin/orders');
    return data;
  },
  completeOrder: async (id) => {
    const { data } = await apiClient.put(`/admin/orders/${id}/complete`);
    return data;
  },
  getPromoSettings: async () => {
    const { data } = await apiClient.get('/admin/promo');
    return data;
  },
  savePromoSettings: async (settings) => {
    const { data } = await apiClient.post('/admin/promo', settings);
    return data;
  },
  getSettings: async () => {
    const { data } = await apiClient.get('/admin/settings');
    return data;
  },
  saveSettings: async (settings) => {
    const { data } = await apiClient.post('/admin/settings', settings);
    return data;
  }
};
