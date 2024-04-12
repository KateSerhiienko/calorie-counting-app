<template>
  <aside>
    <sidebar />
  </aside>
  <main>
    <router-view />
  </main>
  <footer>
    <footerbar />
  </footer>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import GreetingPage from './components/pages/GreetingPage.vue';
import CalorieCountingPage from './components/pages/CalorieCountingPage.vue';
import CalorieRecordingPage from './components/pages/CalorieRecordingPage.vue';
import Footerbar from './components/Footerbar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    GreetingPage,
    CalorieCountingPage,
    CalorieRecordingPage,
    Footerbar,
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
