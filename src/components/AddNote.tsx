import { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import type { NoteProps } from '../types';

function AddNote({ leadId }: NoteProps) {
  const [noteText, setNoteText] = useState('');
  const { createNot } = useNotes(leadId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim() === '') return;

    await createNot(noteText);
    setNoteText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder='Add a note...'
        rows={4}
        style={{ width: '100%', marginBottom: '8px' }}
      />
      <button type='submit'>Add Note</button>
    </form>
  );
}

export default AddNote;
