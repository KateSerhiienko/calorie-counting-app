<template>
  <div
    class="nav-wrapper"
    :class="view"
  >
    <ul>
      <li
        v-for="(nav, index) in getNav"
        :key="nav.title"
        :class="{
          active: $route.path === nav.to,
          plus: nav.to === '/add_food',
        }"
      >
        <div v-if="view !== 'bottom' || index !== getNav.length - 1">
          <router-link :to="nav.to">
            <svg :viewBox="svg[`nav-item-${index + 1}`].viewBox">
              <path :d="svg[`nav-item-${index + 1}`].path" />
            </svg>
            <p
              v-if="view !== 'bottom'"
              class="nav-item-title"
            >
              {{ nav.title }}
            </p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'NavComponent',
    props: {
      view: {
        type: String,
        default: 'bottom',
      },
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
    svg {
      width: 32px;
    }

    .active {
    }
  }

  .nav-wrapper.bottom {
    ul {
      display: flex;
      justify-content: center;

      .plus {
        order: 2;
      }

      li:nth-child(2) {
        order: 1;
      }

      li:nth-child(3) {
        order: 3;
      }
    }
  }

  .nav-wrapper.burger {
  }
</style>
