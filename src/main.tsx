import '@icon-park/react/styles/index.css';
import './styles/normalize.css';
import 'virtual:windi.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <App />,
);
