import { createApp } from 'vue';
import './style.css';
import 'primeicons/primeicons.css';
import vue3GoogleLogin from 'vue3-google-login';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);

app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
});

app.mount('#app');
