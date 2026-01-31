import type { Lead } from '../types';
import api from './axios';

export const getLeads = async () => {
  const { data } = await api.get<Lead[]>('/leads');
  return data;
};

export const createLead = async (leadData: Partial<Lead>) => {
  const { data } = await api.post<Lead>('/leads', leadData);
  return data;
};

export const updateLead = async (id: string, leadData: Partial<Lead>) => {
  const { data } = await api.patch<Lead>(`/leads/${id}`, leadData);
  return data;
};