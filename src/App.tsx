import React from 'react';

import Router from '@/routes/Router';

import AppHeader from './components/AppHeader/AppHeader';

function App() {
  return (
    <div className="relative w-100vw h-100vh dark:bg-[#1C2128] dark:text-light-200">
      <AppHeader />
      <Router />
    </div>
  );
}

export default App;
