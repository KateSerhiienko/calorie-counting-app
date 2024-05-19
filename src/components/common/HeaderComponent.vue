<template>
  <div class="header-wrapper">
    <template v-if="getIsTablet">
      <slot></slot>
    </template>
    <div class="header-title">
      <svg
        v-if="isArrow"
        class="arrow"
        :viewBox="svg['arrow'].viewBox"
        @click="setModalOpened('')"
      >
        <path :d="svg['arrow'].path" />
      </svg>
      <h1>{{ title }}</h1>
      <div class="burger">
        <svg
          v-if="isMenu"
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
    .header-title {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    svg {
      width: 40px;
      fill: $primary-text-color;
    }

    h1 {
      font-size: 26px;
    }

    .burger {
      min-width: 40px;
    }
  }

  @include respond-to(tablet) {
    .header-wrapper {
      display: flex;
      flex-direction: column;
      padding-bottom: $container-padding;
    }
  }
</style>
