import { DEFAULT_ICON_CONFIGS, IconProvider } from '@icon-park/react';
import React from 'react';

import Router from '@/routes/Router';

import lightBgImg from './assets/bg.png';
import AppHeader from './components/AppHeader';

const IconConfig = {
  ...DEFAULT_ICON_CONFIGS,
  strokeWidth: 3,
};

function App() {
  return (
    <IconProvider value={IconConfig}>
      <div
        className="relative w-100vw h-100vh
          bg-cover dark:bg-[#1C2128]
          font-sans text-gray-800 dark:text-light-200"
        style={{ background: `url(${lightBgImg}) center / cover no-repeat` }}
      >
        <AppHeader />
        <Router />
      </div>
    </IconProvider>
  );
}

export default App;
