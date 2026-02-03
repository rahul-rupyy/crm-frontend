const NoteCard = ({ author, text, time }: { author: string; text: string; time: string }) => {
  const initial = author ? author.charAt(0).toUpperCase() : '?';

  return (
    <div className='border border-green-200 bg-green-50 dark:bg-green-900/20 rounded-lg p-3 shadow-sm'>
      <div className='flex items-center justify-between mb-2'>
        <div className='flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold'>
            {initial}
          </div>
          <div>
            <p className='text-sm font-medium text-green-800 dark:text-green-200'>{author}</p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>{time}</p>
          </div>
        </div>
      </div>

      <p className='text-gray-700 dark:text-gray-100'>{text}</p>
    </div>
  );
};

export default NoteCard;
