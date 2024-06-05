<template>
  <div class="header-wrapper">
    <div
      class="arrow"
      v-if="isArrow"
    >
      <svg
        :viewBox="svg['arrow'].viewBox"
        @click="setModalOpened('')"
      >
        <path :d="svg['arrow'].path" />
      </svg>
    </div>
    <h1 :class="{ 'center-align': isModal }">{{ title }}</h1>

    <div v-if="isMenu && getIsDesktop">
      <slot></slot>
    </div>

    <div
      class="burger"
      v-else-if="isMenu"
    >
      <svg
        :viewBox="svg['nav-burger'].viewBox"
        @click="isOpenedPopup = true"
      >
        <path :d="svg['nav-burger'].path" />
      </svg>
    </div>

    <popup-component
      :visible="isOpenedPopup"
      @close="isOpenedPopup = false"
    >
      <slot></slot>
    </popup-component>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import PopupComponent from './PopupComponent.vue';
  import NavComponent from './NavComponent.vue';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'HeaderComponent',
    components: {
      PopupComponent,
      NavComponent,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      isArrow: {
        type: Boolean,
        default: false,
      },
      isMenu: {
        type: Boolean,
        default: true,
      },
      isModal: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        isOpenedPopup: false,
      };
    },
    computed: {
      ...mapGetters([
        'getModalOpened',
        'getIsAddFoodManually',
        'getIsTablet',
        'getIsDesktop',
      ]),
      svg() {
        return svgJSON;
      },
    },
    watch: {
      getModalOpened(newVal) {
        if (newVal) {
          this.isOpenedPopup = false;
        }
      },
      getIsAddFoodManually() {
        this.isOpenedPopup = false;
      },
      $route() {
        if (this.isOpenedPopup) {
          this.isOpenedPopup = false;
        }
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
  .header-wrapper {
    width: 100%;
    display: flex;

    svg {
      width: 40px;
      fill: $primary-text-color;
      cursor: pointer;
      transition: $transition;

      &:hover {
        fill: $primary-hover-color;
      }
    }

    h1 {
      width: calc(100% - 80px);
      font-size: 26px;

      &.center-align {
        text-align: center;
      }
    }
  }

  @include respond-to-tablet-and-desktop {
    .header-wrapper {
      h1 {
        font-size: 32px;
      }
    }
  }

  @include respond-to(desktop) {
    .header-wrapper {
      .arrow {
        width: 225px;
      }

      h1 {
        width: calc(100% - 225px * 2);
      }
    }
  }
</style>
