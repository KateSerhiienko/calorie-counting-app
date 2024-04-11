import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

import router from './utils/router.js';
import store from './utils/store.js';

import { mapGetters } from 'vuex';

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$mapGetters = mapGetters;

app.use(router);
app.use(store);

app.mount('#app');
