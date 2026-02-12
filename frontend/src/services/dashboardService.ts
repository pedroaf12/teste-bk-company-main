import api from './api';
import { DashboardData } from '../types/Dashboard';

export const dashboardService = {
  async getData(startDate: string, endDate: string): Promise<DashboardData> {
    const response = await api.get('/dashboard', {
      params: {
        start: startDate,
        end: endDate,
      },
    });
    return response.data;
  },
};