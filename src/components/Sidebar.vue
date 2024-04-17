<template>
  <div class="wrapper">
    <div class="logo">
      <svg
        :viewBox="svg['logo'].viewBox"
      >
        <path :d="svg['logo'].path" />
      </svg>
    </div>
    <ul class="nav">
      <li
        class="nav-item"
        v-for="(navItem, index) in getNav"
        :key="navItem.title"
        :class="{ active: $route.path == navItem.to}"
        @click="animateNavItem"
      >
      <div class="nav-item-bg"></div>
        <div class="nav-item-icon">
          <svg
            :viewBox="svg[`nav-item-${index + 1}`].viewBox"
          >
            <path :d="svg[`nav-item-${index + 1}`].path" />
          </svg>
        </div>
        <div class="nav-item-link">
          <router-link :to="navItem.to">{{ navItem.title }}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import svgJSON from '../assets/svg/svg.json';

export default {
  name: 'Sidebar',
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

<style scoped>
.logo {
  margin-top: 40px;
  margin-bottom: 60px;
  fill: #ffffff;
}

.nav-item {
  width: 105%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding:  15px 0 15px 15px;
  border-radius: 40px 0 0 40px;
}

.nav-item:not(.active):hover a,
.nav-item:not(.active):hover .nav-item-icon {
  color: #F1F1F1;
  fill: #F1F1F1;
  transition: .3s ease-in-out;
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
  box-shadow: -10px 10px 15px rgba(0, 0, 0, .2);
  background: #F1F1F1;
  transition: .3s ease-in-out;
}

.nav-item-link {
  z-index: 1;
}

a {
  color: #205A47;
}

.nav-item-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  fill: #205A47;
  z-index: 1;
}
</style>

<!-- https://vuejs.org/guide/extras/animation - animation numbers -->
