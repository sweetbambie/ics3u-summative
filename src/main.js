import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

const app = createApp(App);
app.use(router);
app.use(createPinia());  
app.mount('#app');

const apiKey = import.meta.env.VITE_TMDB_KEY;
createApp(App).use(createPinia()).use(router).mount('#app');
