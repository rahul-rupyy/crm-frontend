import api from './axios';
import type { Note, ApiResponse } from '../types';

const unwrap = <T>(payload: ApiResponse<T> | T | null | undefined): T | null => {
  if (payload == null) return null;

  if (typeof payload === 'object' && payload !== null && 'data' in payload) {
    const p = payload as ApiResponse<T>;
    if (p.data !== undefined) return p.data;
  }

  return payload as T;
};

export const getNotesByLeadId = async (leadId: string): Promise<Note[]> => {
  const response = await api.get(`/leads/${leadId}/notes`);
  const data = unwrap<Note[]>(response.data);
  return Array.isArray(data) ? data : [];
};

export const createNote = async (leadId: string, noteData: Partial<Note>): Promise<Note | null> => {
  const response = await api.post(`/leads/${leadId}/notes`, noteData);
  const data = unwrap<Note>(response.data);

  if (data == null) {
    // Backend didn't return the created note; try fetching notes and return the most recent one
    try {
      const notes = await getNotesByLeadId(leadId);
      if (Array.isArray(notes) && notes.length > 0) return notes[notes.length - 1];
    } catch (err) {
      console.error(err);
    }
  }

  return data;
};
