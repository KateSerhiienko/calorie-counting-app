<template>
  <sidebar />
  <main>
    <router-view />
  </main>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import GreetingPage from './components/pages/GreetingPage.vue';
import CalorieCountingPage from './components/pages/CalorieCountingPage.vue';
import CalorieRecordingPage from './components/pages/CalorieRecordingPage.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    GreetingPage,
    CalorieCountingPage,
    CalorieRecordingPage,
  },
};
</script>

<style>
span {
  margin: 0 5px;
}

main {
  display: inline-block;
  vertical-align: top;
}
</style>
