<template>
  <div class="wrapper">
    <div class="logo">
      <!-- <svg :viewBox="svg['logo'].viewBox">
        <path :d="svg['logo'].path" />
      </svg> -->
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
              <!-- <svg :viewBox="svg[`nav-item-${index + 1}`].viewBox">
                <path :d="svg[`nav-item-${index + 1}`].path" />
              </svg> -->
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
></style>
