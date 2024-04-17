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
>
  .global-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $primary-color-light;
    background: linear-gradient(
      45deg,
      $primary-color-light 0%,
      lighten($primary-color-light, 10%) 100%
    );
  }

  .app-wrapper {
    width: 1024px;
    height: 700px;
    display: grid;
    grid-template-columns: 235px auto;
    grid-template-rows: 610px auto;
    grid-template-areas: 'aside main' 'aside footer';
    background: $primary-color;
    background: linear-gradient(
      0deg,
      $primary-color 0%,
      lighten($primary-color, 5%) 100%
    );
    border-radius: 40px;
    box-shadow: -10px 10px 15px rgba($background-color-dark, 0.2);
    overflow: hidden;
    font-family: Amiko;
  }

  aside,
  main,
  footer {
    padding: 10px;
  }

  aside {
    grid-area: aside;
  }

  main {
    grid-area: main;
    background: $background-color;
    color: $primary-color-dark;
    box-shadow: -10px 10px 15px rgba($background-color-dark, 0.2);
    padding-left: 0;
  }

  .main-bg {
    width: 100%;
    height: 100%;
    background: $background-color;
    transform: translate(0px, 0);
    padding-left: 10px;
  }

  footer {
    grid-area: footer;
    background: $primary-color;
    background: linear-gradient(
      90deg,
      $primary-color 0%,
      $secondary-color-dark 100%
    );
    box-shadow: -10px 10px 15px rgba($background-color-dark, 0.2);
  }
</style>
