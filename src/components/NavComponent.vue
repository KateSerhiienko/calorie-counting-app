<template>
  <div
    class="nav-wrapper"
    :class="view"
  >
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
    name: 'NavComponent',
    props: {
      view: {
        type: String,
        default: 'bottom',
      },
    },
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
  .nav-wrapper {
  }

  .nav-wrapper.bottom {
  }

  .nav-wrapper.burger {
  }
</style>
