<template>
  <div class="app-wrapper">
    <header>
      <header-component
        :title="$route.name"
        :is-menu="!getIsTablet && !getIsDesktop"
      >
        <template v-if="!getIsDesktop">
          <nav-component :view="getIsTablet ? 'line-view' : ''" />
        </template>
      </header-component>
    </header>
    <aside v-if="getIsDesktop">
      <nav-component />
    </aside>
    <main>
      <div class="main-wrapper">
        <router-view />
      </div>
    </main>
    <footer>
      <template v-if="getIsTablet || getIsDesktop">
        <developer-modal />
      </template>
      <template v-else>
        <nav-component :view="'line-view'" />
      </template>
    </footer>
    <wrapper-modal />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import HeaderComponent from './components/common/HeaderComponent.vue';
  import NavComponent from './components/common/NavComponent.vue';
  import WrapperModal from './components/modal/WrapperModal.vue';
  import DeveloperModal from './components/modal/DeveloperModal.vue';

  export default {
    name: 'App',
    components: {
      HeaderComponent,
      NavComponent,
      WrapperModal,
      DeveloperModal,
    },
    computed: {
      ...mapGetters(['getIsTablet', 'getIsDesktop']),
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
    max-width: $main-wrapper-max-width;
    height: 100%;
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
      overflow: hidden;

      .main-wrapper {
        padding: 60px 0 40px;
        height: 100%;
        overflow: scroll;
      }
    }

    footer {
      position: absolute;
      bottom: 0;
      height: 70px;
      width: 100%;
      @include blur-bg($secondary-bg-color);
      box-shadow: 0 -2px 2px rgba($primary-text-color, 0.02);
    }
  }

  @include respond-to-tablet-and-desktop {
    .app-wrapper {
      footer {
        height: 100px;
        padding: 0 20px;
      }
    }
  }

  @include respond-to(tablet) {
    .app-wrapper {
      main {
        padding: 140px 20px 70px;
      }
    }
  }

  @include respond-to(desktop) {
    .app-wrapper {
      display: grid;
      grid-template: 'aside header' 'aside main';
      grid-template-columns: 220px auto;

      header {
        grid-area: header;
      }

      aside {
        grid-area: aside;
        padding: 80px 0 0 20px;
        background: $secondary-bg-color;
        box-shadow: $box-shadow;
      }

      main {
        grid-area: main;
      }
    }
  }
</style>
