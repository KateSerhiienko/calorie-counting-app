<template>
  <div class="header-wrapper">
    <h1>{{ $route.name }}</h1>
    <svg
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
        <nav-component
          :view="'burger'"
          @nav-item-click="isOpenedPopup = false"
        />
      </popup-component>
    </div>
  </div>
</template>

<script>
  import PopupComponent from './PopupComponent.vue';
  import NavComponent from './NavComponent.vue';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'HeaderComponent',
    components: {
      PopupComponent,
      NavComponent,
    },
    data() {
      return {
        isOpenedPopup: false,
      };
    },
    computed: {
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
  .header-wrapper {
    svg {
      width: 32px;
    }
  }
</style>
