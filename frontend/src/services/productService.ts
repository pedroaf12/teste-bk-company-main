import api from './api';
import { Product } from '../types/Product';

export const productService = {
  async getAll(): Promise<Product[]> {
    const response = await api.get('/products');
    return response.data;
  },

  async create(product: Omit<Product, 'id'> & { id: string }): Promise<Product> {
    const response = await api.post('/products', product);
    return response.data;
  },

  async getById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};