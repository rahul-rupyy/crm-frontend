import { useEffect, useState, useCallback } from 'react';
import type { Note } from '../types/index';
import { getNotesByLeadId, createNote } from '../api/notes';

export const useNotes = (leadId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!leadId) return;
    try {
      setLoading(true);
      const data = await getNotesByLeadId(leadId);
      setNotes(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    refetch();
  }, [leadId, refetch]);

  const createNot = async (text: string): Promise<boolean> => {
    if (!leadId) return false;
    try {
      setLoading(true);
      await createNote(leadId, { text });
      await refetch();
      return true;
    } catch (err) {
      console.error('Error creating note:', err);
      setError('Failed to create note');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { notes, loading, error, createNot, refetch };
};
