import { useNotes } from '../hooks/useNotes';
import NoteCard from './NoteCard';

const NoteList = ({ leadId }: { leadId: string }) => {
  const { notes, loading, error } = useNotes(leadId);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p>Error: {error}</p>;
  if (notes.length === 0) return <p>No notes available.</p>;

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          author={note.createdBy.name}
          text={note.text}
          time={new Date(note.createdAt).toLocaleString()}
        />
      ))}
    </div>
  );
};

export default NoteList;
