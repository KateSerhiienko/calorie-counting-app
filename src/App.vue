<template>
  <div class="app-wrapper">
    <header>
      <header-component :title="$route.name">
        <nav-component :view="'burger'" />
      </header-component>
    </header>
    <main>
      <div class="main-wrapper">
        <router-view />
      </div>
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
    height: 100%;
    max-width: $mobile-max-width;
    min-width: $mobile-min-width;
    max-height: $mobile-max-height;
    min-height: $mobile-min-height;
    margin: 0 auto;

    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    color: $primary-text-color;
    background-color: $primary-bg-color;
    box-shadow: $box-shadow;

    header {
      position: absolute;
      top: 0;
      width: 100%;
      margin-bottom: $container-padding;
      z-index: 1;
      padding: 40px 20px 0;
      @include blur-bg($primary-bg-color);
    }

    main {
      height: 100vh;
      padding: 30px 20px;

      .main-wrapper {
        padding: 60px 0 40px;
        height: 100%;
        overflow: scroll;
      }
    }

    nav {
      position: absolute;
      bottom: 0;
      height: 70px;
      width: 100%;
      @include blur-bg($secondary-bg-color);
      box-shadow: 0 -2px 2px rgba($primary-text-color, 0.02);
    }
  }
</style>
