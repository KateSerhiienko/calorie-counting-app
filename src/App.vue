<!-- <template>
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
</template> -->

<template>
  <div class="app-wrapper">
    <header>
      <h1>Today</h1>
      <div>
        <nav-component :view="'burger'" />
      </div>
    </header>
    <main>
      <router-view />
    </main>
    <nav>
      <nav-component :view="'bottom'" />
    </nav>
  </div>
</template>

<script>
  import NavComponent from './components/NavComponent.vue';
  import FooterSection from './components/FooterSection.vue';

  export default {
    name: 'App',
    components: {
      NavComponent,
      FooterSection,
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .app-wrapper {
    max-width: 959px;
    min-width: 375px;
    width: 100%;
    padding: 40px 20px 0;

    header {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
    }

    nav {
      position: fixed;
      bottom: 0;
    }
  }
</style>
