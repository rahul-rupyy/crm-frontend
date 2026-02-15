import { useNotes } from '../hooks/useNotes';
import NoteCard from './NoteCard';
import type { Note } from '../types';

const NoteList = ({
  leadId,
  notes: propNotes,
  loading: propLoading,
  error: propError,
}: {
  leadId: string;
  notes?: Note[];
  loading?: boolean;
  error?: string | null;
}) => {
  const hook = useNotes(leadId);

  const notes = propNotes ?? hook.notes;
  const loading = propLoading ?? hook.loading;
  const error = propError ?? hook.error;

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!notes || notes.length === 0) return <p>No notes available.</p>;

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          author={note.createdBy?.name ?? 'Unknown'}
          text={note.text}
          time={new Date(note.createdAt).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default NoteList;
