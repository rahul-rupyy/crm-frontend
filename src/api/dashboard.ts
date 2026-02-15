import api from './axios';
import type { DashboardMetrics, Lead, ApiResponse } from '../types';

export interface GetDashboardLeadsParams {
  status?: string;
  source?: string;
  search?: string;
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  // 1. Axios returns response.data (which is our ApiResponse)
  // 2. We return response.data.data (which is DashboardMetrics)
  const response = await api.get<ApiResponse<DashboardMetrics>>('/leads/dashboard');
  return response.data.data;
};

export const getDashboardLeads = async (params: GetDashboardLeadsParams): Promise<Lead[]> => {
  const response = await api.get<ApiResponse<Lead[]>>('/leads', { params });
  return response.data.data;
};
