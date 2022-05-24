import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      const buttons = {
        '.btn': {
          transition: 'transform 0.15s',
          '&:hover': {
            transform: 'scale(1.1);',
          },
          '&:active': {
            transform: 'scale(0.9);',
          },
        },
      };

      addComponents(buttons);
    }),
  ],
});
