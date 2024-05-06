import { createRouter, createWebHistory } from 'vue-router';
import FoodPopup from '../components/popups/FoodPopup.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';
import DeveloperPopup from '../components/popups/DeveloperPopup.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/food',
      name: 'food',
      component: FoodPopup,
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardPage,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage,
    },
    {
      path: '/developer',
      name: 'developer',
      component: DeveloperPopup,
    },
  ],
});

export default router;
