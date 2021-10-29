import { createRouter, createWebHistory } from 'vue-router';
import Upload from '@/pages/upload/Upload.vue';
import Download from '@/pages/download/Download.vue';

const routes = [
  { path: '/', name: 'home', redirect: '/upload' },
  {
    path: '/upload', name: 'upload', meta: { menu: 'upload' }, component: Upload,
  },
  {
    path: '/download', name: 'download', meta: { menu: 'download' }, component: Download,
  },
];

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes,
});
