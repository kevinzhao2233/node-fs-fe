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
  history: createWebHistory(),
  routes,
});
