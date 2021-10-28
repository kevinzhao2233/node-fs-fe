import { createRouter, createWebHistory } from 'vue-router';
import Upload from '@/pages/Upload.vue';

const routes = [
  { path: '/', redirect: '/upload' },
  { path: '/upload', component: Upload },
];

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(),
  routes,
});
