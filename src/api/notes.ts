import api from './axios';
import type { Note } from '../types';

export const getNotesByLeadId = async (leadId: string) => {
  const { data } = await api.get<Note[]>(`/leads/${leadId}/notes`);
  return data;
};

export const createNote = async (leadId: string, noteData: Partial<Note>) => {
  const { data } = await api.post<Note>(`/leads/${leadId}/notes`, noteData);
  return data;
};
