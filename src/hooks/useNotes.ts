import { useEffect, useState } from 'react';
import type { Note } from '../types/index';
import { getNotesByLeadId, createNote } from '../api/notes';

export const useNotes = (leadId: string) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const data = await getNotesByLeadId(leadId);
        setNotes(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch notes');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [leadId]);

  const createNot = async (text: string) => {
    try {
      setLoading(true);
      const newNote = await createNote(leadId, { text });
      setNotes((prevNotes: Note[]) => [...prevNotes, newNote]);
    } catch (err) {
      console.error(err);
      setError('Failed to create note');
    } finally {
      setLoading(false);
    }
  };
  return { notes, loading, error, createNot };
};
