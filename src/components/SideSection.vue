<template>
  <div class="wrapper">
    <div class="logo">
      <svg :viewBox="svg['logo'].viewBox">
        <path :d="svg['logo'].path" />
      </svg>
    </div>
    <ul class="nav">
      <li
        v-for="(navItem, index) in getNav"
        :key="navItem.title"
      >
        <router-link :to="navItem.to">
          <div
            class="nav-item"
            :class="{ active: $route.path == navItem.to }"
            @click="animateNavItem"
          >
            <div class="nav-item-bg"></div>
            <div class="nav-item-icon">
              <svg :viewBox="svg[`nav-item-${index + 1}`].viewBox">
                <path :d="svg[`nav-item-${index + 1}`].path" />
              </svg>
            </div>
            <div class="nav-item-link">{{ navItem.title }}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../assets/svg/svg.json';

  export default {
    name: 'SideSection',
    data() {
      return {
        disabled: false,
      };
    },
    computed: {
      ...mapGetters(['getNav']),
      svg() {
        return svgJSON;
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .logo {
    margin-top: 40px;
    margin-bottom: 60px;
    fill: $background-color-light;
  }

  .nav-item {
    width: 105%;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding: 15px 0 15px 15px;
    border-radius: 40px 0 0 40px;
  }

  .nav-item-link,
  .nav-item-icon {
    transition: $transition;
  }

  .nav-item:not(.active):hover .nav-item-link,
  .nav-item:not(.active):hover .nav-item-icon {
    color: $background-color;
    fill: $background-color;
  }

  .active {
    font-weight: bold;
    pointer-events: none;
  }

  .active .nav-item-bg {
    transform: translate(-15px, 0);
  }

  .nav-item-bg {
    position: absolute;
    width: 250px;
    height: 60px;
    border-radius: 40px 0 0 40px;
    transform: translate(210px, 0);
    box-shadow: -10px 10px 15px rgba($background-color-dark, 0.2);
    background: $background-color;
    transition: $transition;
  }

  .nav-item-link {
    z-index: 1;
  }

  a {
    color: $primary-color-dark;
  }

  .nav-item-icon {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    fill: $primary-color-dark;
    z-index: 1;
  }
</style>

<!-- https://vuejs.org/guide/extras/animation - animation numbers -->
