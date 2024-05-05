<template>
  <div class="global-wrapper">
    <div class="app-wrapper">
      <aside>
        <side-section />
      </aside>
      <main>
        <div class="main-bg">
          <router-view />
        </div>
      </main>
      <footer>
        <footer-section />
      </footer>
    </div>
  </div>
</template>

<script>
  import SideSection from './components/SideSection.vue';
  import FooterSection from './components/FooterSection.vue';

  export default {
    name: 'App',
    components: {
      SideSection,
      FooterSection,
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
