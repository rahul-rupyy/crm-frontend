type Theme = 'light' | 'dark';

export const getTheme = (): Theme => {
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  const body = document.body;
  if (theme === 'dark') {
    root.classList.add('dark');
    body.classList.add('dark');
    root.style.colorScheme = 'dark';
  } else {
    root.classList.remove('dark');
    body.classList.remove('dark');
    root.style.colorScheme = 'light';
  }
};

export const initTheme = (): void => {
  const theme = getTheme();
  applyTheme(theme);
};

export const setTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
};

export const toggleTheme = (): Theme => {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
};
