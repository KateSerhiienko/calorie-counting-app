<template>
  <ul
    class="nav-wrapper"
    :class="view || 'glb-popup'"
  >
    <li
      class="add-food"
      @click="setModalOpened('mealtime')"
    >
      <svg :viewBox="svg[`nav-item-1`].viewBox">
        <path :d="svg[`nav-item-1`].path" />
      </svg>
      <p>Add food</p>
    </li>

    <li
      class="dashboard"
      :class="{
        active: $route.path === '/',
      }"
    >
      <router-link :to="'/'">
        <svg :viewBox="svg[`nav-item-2`].viewBox">
          <path :d="svg[`nav-item-2`].path" />
        </svg>
        <p>Dashboard</p>
      </router-link>
    </li>

    <li
      class="profile"
      :class="{
        active: $route.path === '/profile',
      }"
    >
      <router-link :to="'/profile'">
        <svg :viewBox="svg[`nav-item-3`].viewBox">
          <path :d="svg[`nav-item-3`].path" />
        </svg>
        <p>Profile</p>
      </router-link>
    </li>

    <li
      class="developer"
      @click="setModalOpened('developer')"
    >
      <svg :viewBox="svg[`nav-item-4`].viewBox">
        <path :d="svg[`nav-item-4`].path" />
      </svg>
      <p>Developer</p>
    </li>
  </ul>
</template>

<script>
  import svgJSON from '../../assets/svg/svg.json';
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'NavComponent',
    props: {
      view: {
        type: String,
        default: '',
      },
    },
    computed: {
      ...mapGetters(['getIsTablet', 'getIsDesktop']),
      svg() {
        return svgJSON;
      },
    },
    methods: {
      ...mapMutations(['setModalOpened']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .nav-wrapper {
    p {
      color: $not-active-color;
    }

    svg {
      width: 32px;
      fill: $not-active-color;
    }

    .active {
      pointer-events: none;

      svg {
        fill: $primary-text-color;
      }

      p {
        color: $primary-text-color;
        font-weight: bold;
      }

      &::after {
        display: block;
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: $primary-text-color;
      }
    }
  }

  .nav-wrapper.line-view {
    padding-top: $container-padding;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: start;

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .add-food {
      order: 1;
      align-self: flex-start;

      svg {
        transform: scale(1.6);
        fill: $primary-color;
      }
    }

    .profile {
      order: 2;
    }

    .developer {
      display: none;
    }

    p {
      display: none;
    }
  }

  @include respond-to(tablet) {
    .nav-wrapper.line-view {
      border-bottom: 1px solid rgba($not-active-light-color, 0.5);
      padding-bottom: calc($container-padding * 2);
      margin-bottom: calc($container-padding * 2);

      li {
        min-width: 100px;
        flex-direction: row;
        width: 33%;

        &:not(:nth-child(3)) {
          border-right: 1px solid $not-active-light-color;
        }
      }

      .active {
        &::after {
          display: none;
        }

        &::before {
          content: '';
          width: 5px;
          height: 5px;
          position: relative;
          right: calc($container-padding / 2);
          border-radius: 50%;
          background-color: #394250;
        }
      }

      a {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      svg {
        margin-right: $container-padding;
      }

      p {
        display: block;
      }
    }
  }
</style>
