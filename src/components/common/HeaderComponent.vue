<template>
  <div class="header-wrapper">
    <svg
      v-if="isArrow"
      class="arrow"
      :viewBox="svg['arrow'].viewBox"
      @click="setModalOpened('')"
    >
      <path :d="svg['arrow'].path" />
    </svg>
    <h1>{{ title }}</h1>
    <svg
      v-if="isMenu"
      :viewBox="svg['nav-burger'].viewBox"
      @click="isOpenedPopup = true"
    >
      <path :d="svg['nav-burger'].path" />
    </svg>
    <div>
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
      ...mapGetters(['getModalOpened']),
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
    svg {
      width: 32px;
    }

    .arrow {
      transform: rotate(90deg);
    }
  }
</style>