import api from './axios';
import type { Lead, CreateLeadPayload, ApiResponse } from '../types/index';

export const getLeads = async () => {
  const { data } = await api.get<ApiResponse<Lead[]>>('/leads?limit=500');
  return data.data;
};

// NEW: Get Single Lead
export const getLead = async (id: string) => {
  const { data } = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
  return data.data;
};

export const createLead = async (payload: CreateLeadPayload) => {
  const { data } = await api.post<ApiResponse<Lead>>('/leads', payload);
  return data.data;
};

// NEW: Update Lead
export const updateLead = async (id: string, payload: Partial<Lead>) => {
  const { data } = await api.patch<ApiResponse<Lead>>(`/leads/${id}`, payload);
  return data.data;
};

export const deleteLead = async (id: string) => {
  const { data } = await api.delete<ApiResponse<null>>(`/leads/${id}`);
  return data;
};
