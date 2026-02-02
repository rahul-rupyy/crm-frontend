import { useEffect, useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: Props) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(localValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [localValue, onChange]);

  return (
    <input
      type='text'
      placeholder='Search leads...'
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className='border rounded p-2 w-64'
    />
  );
};

export default SearchBar;
