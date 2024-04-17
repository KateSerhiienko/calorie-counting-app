import './assets/styles/main.css';

import { createApp } from 'vue';
import axios from 'axios';
import { mapGetters } from 'vuex';
import App from './App.vue';

import router from './utils/router';
import store from './utils/store';

const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$mapGetters = mapGetters;

app.use(router);
app.use(store);

app.mount('#app');
