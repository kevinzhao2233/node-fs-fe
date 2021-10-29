import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router/router';
import 'remixicon/fonts/remixicon.css';

const app = createApp(App);
app.use(router);
app.mount('#app');
