import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '../components/pages/DashboardPage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardPage,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
    },
  ],
});

export default router;
