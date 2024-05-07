import { createRouter, createWebHistory } from 'vue-router';
import AddFoodPopup from '../components/popups/AddFoodPopup.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';
import DeveloperPopup from '../components/popups/DeveloperPopup.vue';
import EditProfilePopup from '../components/popups/EditProfilePopup.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/add_food',
      name: 'Add food',
      component: AddFoodPopup,
    },
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
    {
      path: '/developer',
      name: 'Developer',
      component: DeveloperPopup,
    },
    {
      path: '/edit_profile',
      name: 'Edit Profile',
      component: EditProfilePopup,
    },
  ],
});

export default router;
