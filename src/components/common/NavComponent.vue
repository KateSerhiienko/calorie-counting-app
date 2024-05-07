<template>
  <div
    class="nav-wrapper"
    :class="view"
  >
    <svg
      v-if="view === 'burger'"
      :viewBox="svg['nav-burger'].viewBox"
      @click="toggleNav"
    >
      <path :d="svg['nav-burger'].path" />
    </svg>

    <ul>
      <svg
        v-if="view === 'burger'"
        :viewBox="svg['close-popup'].viewBox"
        @click="hideNav"
      >
        <path :d="svg['close-popup'].path" />
      </svg>
      <li
        v-for="(nav, index) in getNav"
        :key="nav.title"
        :class="{
          active: $route.path === nav.to,
          plus: nav.to === '/add_food',
        }"
        @click="hideNav"
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
    methods: {
      toggleNav() {
        if (this.view === 'burger') {
          this.$el.querySelector('ul').style.display = 'block';
        }
      },
      hideNav() {
        console.log(1);
        if (this.view === 'burger') {
          this.$el.querySelector('ul').style.display = 'none';
        }
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
    ul {
      display: none;
    }
  }
</style>