import { createRouter, createWebHistory } from 'vue-router';
import AddFoodModal from '../components/modal/AddFoodModal.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import ProfilePage from '../components/pages/ProfilePage.vue';
import DeveloperModal from '../components/modal/DeveloperModal.vue';
import EditProfileModal from '../components/modal/EditProfileModal.vue';
import EditFoodModal from '../components/modal/EditFoodModal.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/add_food',
      name: 'Add Food',
      component: AddFoodModal,
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
      component: DeveloperModal,
    },
    {
      path: '/edit_profile',
      name: 'Edit Profile',
      component: EditProfileModal,
    },
    {
      path: '/edit_food/:id',
      name: 'Edit Food',
      component: EditFoodModal,
      props: true
    },
  ],
});

export default router;
