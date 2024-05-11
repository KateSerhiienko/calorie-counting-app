<template>
  <div
    class="nav-wrapper"
    :class="view"
  >
    <ul>
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
  </div>
</template>

<script>
  import svgJSON from '../../assets/svg/svg.json';
  import { mapMutations } from 'vuex';

  export default {
    name: 'NavComponent',
    props: {
      view: {
        type: String,
        default: 'bottom',
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
    svg {
      width: 32px;
      fill: $not-active-color;
    }

    .active {
      pointer-events: none;

      svg {
        fill: $primary-text-color;
      }

      &::after {
        content: '';
        /* position: absolute; */
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: $primary-text-color;
      }
    }
  }

  .nav-wrapper.bottom {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding-top: $container-padding;

    ul {
      width: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: start;
    }

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

  .nav-wrapper.burger {
  }

  .for-modal {
    width: 100px;
    height: 100px;
    background: red;
  }
</style>
