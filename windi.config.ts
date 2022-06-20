import pluginScrollbar from '@windicss/plugin-scrollbar';
import { defineConfig } from 'windicss/helpers';
import scrollSnapPlugin from 'windicss/plugin/scroll-snap';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif',
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      keyframes: {
        dropdown: {
          '0%': { opacity: 0.5, transform: 'scale(0.9, 0.5)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        dropdown: 'dropdown 0.2s cubic-bezier(0.23, 1, 0.32, 1) both',
      },
    },
  },
  plugins: [
    scrollSnapPlugin,
    pluginScrollbar,
  ],
});
