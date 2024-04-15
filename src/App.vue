<template>
  <div class="main-wrapper">
    <div class="app-wrapper">
      <aside>
        <sidebar />
      </aside>
      <main>
        <router-view />
      </main>
      <footer>
        <footerbar />
      </footer>
    </div>
  </div>
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

<style scoped>
 
.main-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(152,197,182);
  background: linear-gradient(45deg, rgba(152,197,182,1) 0%, rgba(192,237,209,1) 100%);
}

.app-wrapper {
  width: 1024px;
  height: 700px;
  display: grid;
  grid-template-columns: 235px auto;
  grid-template-rows: 610px auto;
  grid-template-areas: "aside main" "aside footer";
  background: rgb(97,139,125);
  background: linear-gradient(0deg, rgba(97,139,125,1) 0%, rgba(114,157,143,1) 100%); 
  border-radius: 40px;
  box-shadow: -10px 10px 15px rgba(0, 0, 0, .2);
}

aside, main, footer {
  padding: 10px;
}

aside {
  grid-area: aside;
}

main {
  grid-area: main;
  background: #F1F1F1;
  box-shadow: -10px 10px 15px rgba(0, 0, 0, .2);
}

footer {
  grid-area: footer;
  background: rgb(97,139,125);
  background: linear-gradient(90deg, rgba(97,139,125,1) 0%, rgba(187,148,140,1) 100%); 
  box-shadow: -10px 10px 15px rgba(0, 0, 0, .2);
}
</style>