import { useEffect, useState } from 'react';
import { changeUtterancesTheme } from '@components/Utterances';

const THEME = 'theme';
type ThemeMode = 'light' | 'dark';

export const getCurrentTheme = (): ThemeMode => {
  const localStorageTheme = window.localStorage.getItem(THEME) as ThemeMode;
  const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return localStorageTheme ? localStorageTheme : browserTheme;
};

const useTheme = () => {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    const theme = getCurrentTheme();
    setTheme(theme ?? 'light');
  }, []);

  const toggleTheme = () => {
    theme === 'light' ? saveTheme('dark') : saveTheme('light');
  };

  const saveTheme = (mode: ThemeMode) => {
    document.body.dataset.theme = mode;
    window.localStorage.setItem(THEME, mode);
    setTheme(mode);
    changeUtterancesTheme(mode);
  };

  return { theme, toggleTheme };
};

export default useTheme;
