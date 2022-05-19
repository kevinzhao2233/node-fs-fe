import { Moon, Sun } from '@icon-park/react';
import { useLocalStorageState } from 'ahooks';
import React, { useEffect } from 'react';

function AppHeader() {
  const DefaultPrefersColorIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [prefersColorScheme, setPrefersColorScheme] = useLocalStorageState('NF_prefers_color_scheme', {
    defaultValue: DefaultPrefersColorIsDark ? 'dark' : 'light',
  });

  const toggleMode = () => {
    setPrefersColorScheme(prefersColorScheme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add(prefersColorScheme);
  }, [prefersColorScheme]);

  return (
    <div className="flex absolute top-3 right-10 h-9">
      <div
        onClick={toggleMode}
        className="grid place-items-center gap-4 w-9 cursor-pointer border border-gray-300 dark:border-gray-700 rounded-xl
        shadow-lg shadow-blue-gray-300 dark:shadow-blue-gray-700"
      >
        {prefersColorScheme === 'light' && <Sun theme="outline" size="20" />}
        {prefersColorScheme === 'dark' && <Moon theme="outline" size="20" />}
      </div>
    </div>
  );
}

export default AppHeader;
