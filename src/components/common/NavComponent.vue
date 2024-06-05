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
  import { mapMutations } from 'vuex';

  export default {
    name: 'NavComponent',
    props: {
      view: {
        type: String,
        default: '',
      },
    },
    computed: {
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
    li {
      position: relative;
      display: flex;
      align-items: center;
      cursor: pointer;

      p,
      svg {
        transition: $transition;
      }

      &:hover {
        p {
          color: $primary-hover-color;
        }

        svg {
          fill: $primary-hover-color;
        }
      }

      &::before {
        display: block;
        content: '';
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: transparent;
        transition: $transition;
      }
    }

    p {
      color: $not-active-color;
      font-weight: bold;
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
      }

      &::before {
        background-color: $primary-text-color;
      }
    }
  }

  .nav-wrapper.bottom {
    padding-top: $container-padding;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: start;

    li {
      flex-direction: column-reverse;
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

  .nav-wrapper.left {
    li:not(:has(> a)),
    li > a {
      display: flex;
      align-items: center;
      padding: $container-padding 0;
    }

    .developer {
      display: none;
    }

    svg {
      margin-right: 10px;
    }

    .active {
      &::before {
        bottom: 25px;
        left: -10px;
      }
    }
  }

  .nav-wrapper.add-only {
    height: 100%;

    li {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      min-width: 20vw;
      font-size: 18px;

      &::before {
        display: none;
      }
    }

    svg {
      margin-right: calc($container-padding / 2);
      fill: $primary-color;
      width: 36px;
    }

    .developer,
    .dashboard,
    .profile {
      display: none;
    }
  }

  @include respond-to-tablet-and-desktop {
    .nav-wrapper.left {
      li {
        margin-left: calc(-1 * $container-padding / 2);

        &::before {
          margin-right: calc($container-padding / 2);
        }
      }
    }
  }

  @include respond-to(tablet) {
    .nav-wrapper.left {
      p {
        display: none;
      }
    }
  }
</style>
