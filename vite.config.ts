import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 开发服务端口
    port: 10002,
    // 是否开启 https, 但是开启了也没有证书，只在有些功能必须要 https 协议时使用即可
    https: false,
  },
  resolve: {
    // 别名映射，2.0 版本不再需要以 / 结尾了
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@comps': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@pages': path.resolve(__dirname, './src/views'),
    },
  },
  plugins: [react(), WindiCSS()],
  build: {
    sourcemap: true,
  },
  publicDir: '/public',
});
