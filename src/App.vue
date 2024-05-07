<template>
  <div class="app-wrapper">
    <header>
      <h1>{{ $route.name }}</h1>
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
  import NavComponent from './components/common/NavComponent.vue';
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
    width: 100%;
    max-width: 959px;
    min-width: 375px;
    font-family: Arial, Helvetica, sans-serif;

    header {
      position: sticky;
      top: 0;
      display: flex;
      justify-content: space-between;
      padding: 40px 20px 0;
    }

    main {
      padding: 0 20px 0;
    }

    nav {
      width: 100%;
      position: fixed;
      bottom: 0;
      padding: 0 20px 20px;
    }
  }
</style>
