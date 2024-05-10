<template>
  <div class="app-wrapper">
    <header>
      <header-component :title="$route.name">
        <nav-component :view="'burger'" />
      </header-component>
    </header>
    <main>
      <router-view />
    </main>
    <nav>
      <nav-component :view="'bottom'" />
    </nav>
    <wrapper-modal />
  </div>
</template>

<script>
  import HeaderComponent from './components/common/HeaderComponent.vue';
  import NavComponent from './components/common/NavComponent.vue';
  import WrapperModal from './components/modal/WrapperModal.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      NavComponent,
      WrapperModal,
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .app-wrapper {
    position: relative;
    width: 100%;
    max-width: $mobile-max-width;
    min-width: $mobile-min-width;
    max-height: $mobile-max-height;
    min-height: $mobile-min-height;
    margin: 0 auto;
    padding-top: 40px;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: $primary-text-color;
    background-color: $primary-bg-color;
    box-shadow: $box-shadow;
  }

  header {
    position: sticky;
    top: 0;
    height: 40px;
    padding: 0 20px;
    margin-bottom: $container-padding;
  }

  main {
    height: calc(100vh - 40px - 40px - 68px);
    /* - (padding-top .app-wrapper) - (height header) - (height nav) */
    max-height: calc($mobile-max-height - 40px - 40px - 68px);
    min-height: calc($mobile-min-height - 40px - 40px - 68px);
    padding: 0 20px;
  }

  nav {
    position: sticky;
    bottom: 0;
    height: 68px;
    width: 100%;
    padding: 0 20px 20px;
  }
</style>
