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
            <div class="nav-item-title">{{ navItem.title }}</div>
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

  .nav-item:not(.active):hover .nav-item-title,
  .nav-item:not(.active):hover .nav-item-icon {
    color: $background-color;
    stroke: $background-color;
  }

  .active {
    font-weight: bold;
    pointer-events: none;

    .nav-item-bg {
      transform: translate(-15px, 0);
    }

    .nav-item-icon {
      stroke-width: 3;
    }
  }

  .nav-item-bg {
    position: absolute;
    width: 250px;
    height: 60px;
    border-radius: 40px 0 0 40px;
    transform: translate(210px, 0);
    box-shadow: $box-shadow;
    background: $background-color;
    transition: $transition;
  }

  .nav-item-title,
  .nav-item-icon {
    transition: $transition;
  }

  .nav-item-title {
    font-size: 12px;
    z-index: 1;
  }

  a {
    color: $primary-color-dark;
  }

  .nav-item-icon {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    z-index: 1;
    fill: transparent;
    stroke: $primary-color-dark;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>

<!-- https://vuejs.org/guide/extras/animation - animation numbers -->
