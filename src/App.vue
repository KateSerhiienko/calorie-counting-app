<template>
  <div class="app-wrapper">
    <header>
      <header-component
        :title="$route.name"
        :is-menu="!getIsTablet && !getIsDesktop"
      >
        <template v-if="!getIsTablet && !getIsDesktop">
          <nav-component />
        </template>
      </header-component>
    </header>
    <aside v-if="getIsTablet || getIsDesktop">
      <nav-component :view="'left'" />
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
        <nav-component :view="'bottom'" />
      </template>
    </footer>
    <wrapper-modal />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import axios from 'axios';
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
    methods: {
      preloadDatabase() {
        axios
          .get(
            'https://node-server-v342.onrender.com/api/products?title=preload'
          )
          .catch((error) => {
            console.error('Error preloading database:', error);
          });
      },
    },
    mounted() {
      this.preloadDatabase();
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
      padding: 40px $container-padding 0;
      @include blur-bg($primary-bg-color);

      .header-wrapper {
        justify-content: space-between;
      }
    }

    main {
      height: 100vh;
      padding: 30px $container-padding;
      overflow: hidden;

      .main-wrapper {
        padding: 60px 0 $container-padding;
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
      display: grid;
      grid-template: 'aside header' 'aside main';

      header {
        grid-area: header;
      }

      aside {
        grid-area: aside;
        padding: 80px 0 0 $container-padding;
        background: $secondary-bg-color;
        box-shadow: $box-shadow;
        z-index: 1;
      }

      main {
        grid-area: main;
        .main-wrapper {
          padding: 60px 0 70px;
        }
      }
    }
  }

  @include respond-to(tablet) {
    .app-wrapper {
      grid-template-columns: 68px auto;

      footer {
        padding-left: 68px;
      }
    }
  }

  @include respond-to(desktop) {
    .app-wrapper {
      grid-template-columns: 188px auto;

      footer {
        padding-left: 188px;
      }
    }
  }
</style>
