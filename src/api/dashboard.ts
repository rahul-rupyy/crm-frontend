import axios from './axios';
import type { DashboardMetrics, Lead, DashboardFiltersState } from '../types';

export const getDashboardMetrics = () => {
  return axios.get<DashboardMetrics>('/leads/dashboard/metrics');
};

interface GetDashboardLeadsParams extends DashboardFiltersState {
  search?: string;
}

export const getDashboardLeads = (params: GetDashboardLeadsParams) => {
  return axios.get<Lead[]>('/leads/dashboard', { params });
};
