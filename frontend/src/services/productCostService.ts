import api from './api';
import { ProductCost } from '../types/ProductCost';

export const productCostService = {
  async getAll(): Promise<ProductCost[]> {
    const response = await api.get('/product-costs');
    return response.data;
  },

  async createOrUpdate(cost: ProductCost): Promise<ProductCost> {
    const response = await api.post('/product-costs', cost);
    return response.data;
  },

  async getByProductId(productId: string): Promise<ProductCost> {
    const response = await api.get(`/product-costs/${productId}`);
    return response.data;
  },
};