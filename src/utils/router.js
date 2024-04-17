import { createRouter, createWebHistory } from 'vue-router';
import GreetingPage from '../components/pages/GreetingPage.vue';
import CalorieCountingPage from '../components/pages/CalorieCountingPage.vue';
import CalorieRecordingPage from '../components/pages/CalorieRecordingPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'greeting',
      component: GreetingPage,
    },
    {
      path: '/calorie_counting',
      name: 'calorie_counting',
      component: CalorieCountingPage,
    },
    {
      path: '/calorie_recording',
      name: 'calorie_recording',
      component: CalorieRecordingPage,
    },
  ],
});

export default router;
