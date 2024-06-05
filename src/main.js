import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/index.css';
import store from '@/store/';
import VueCryptojs from 'vue-cryptojs';
import VueModernNotification from 'vue-modern-notification';

createApp(App).use(router).use(store).use(VueCryptojs).use(VueModernNotification).mount('#app')