import { createRouter, createWebHistory } from 'vue-router';
import AddFoodPopup from '../components/popups/AddFoodPopup.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';
import DeveloperPopup from '../components/popups/DeveloperPopup.vue';
import EditProfilePopup from '../components/popups/EditProfilePopup.vue';
import EditFoodPopup from '../components/popups/EditFoodPopup.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/add_food',
      name: 'Add Food',
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
    {
      path: '/edit_food/:id',
      name: 'Edit Food',
      component: EditFoodPopup,
      props: true
    },
  ],
});

export default router;
