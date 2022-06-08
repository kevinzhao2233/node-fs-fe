import { defineConfig } from 'windicss/helpers';
import plugin from 'windicss/plugin';
import scrollSnapPlugin from 'windicss/plugin/scroll-snap';

export default defineConfig({
  darkMode: 'class',
  safelist: 'p-3 p-4 p-5',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      keyframes: {
        dropdown: {
          '0%': { opacity: 0.5, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.12s ease-out',
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
    scrollSnapPlugin,
  ],
});
