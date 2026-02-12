import api from './api';
import { Order } from '../types/Order';

export const orderService = {
  async getAll(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data;
  },

  async getRecentOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data.slice(0, 5);
  },

  async getById(id: string): Promise<Order> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(order: Order): Promise<Order> {
    const response = await api.post('/orders', order);
    return response.data;
  },

  async updateOrder(id: string, order: Order): Promise<Order> {
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  },

  async deleteOrder(id: string): Promise<void> {
    await api.delete(`/orders/${id}`);
  }
};