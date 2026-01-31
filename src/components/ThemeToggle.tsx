import { Moon, Sun } from 'lucide-react';
import { getTheme, toggleTheme } from '../theme';
import { useState } from 'react';

const baseBtn =
  'fixed top-4 right-4 inline-flex items-center justify-center rounded-full p-2 shadow-sm bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600';

const ThemeToggle: React.FC = () => {
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => getTheme());

  const onToggle = () => {
    const next = toggleTheme();
    setThemeState(next);
  };

  return (
    <button aria-label='Toggle theme' onClick={onToggle} className={baseBtn}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
