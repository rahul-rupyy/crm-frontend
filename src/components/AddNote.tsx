import { useState } from 'react';

type Props = {
  onAdd: (text: string) => Promise<boolean>;
};

function AddNote({ onAdd }: Props) {
  const [noteText, setNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (noteText.trim() === '') return;

    setSubmitting(true);
    const ok = await onAdd(noteText);
    setSubmitting(false);

    if (ok) {
      setNoteText('');
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='text-left'>
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder='Add a note...'
        rows={4}
        className='w-full mb-2 p-2 border rounded'
      />
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={submitting}
          className='px-4 py-2 bg-green-600 text-white rounded disabled:opacity-60'
        >
          {submitting ? 'Adding...' : 'Add Note'}
        </button>
        {success && <span className='text-sm text-green-700'>Note added</span>}
      </div>
    </form>
  );
}

export default AddNote;
