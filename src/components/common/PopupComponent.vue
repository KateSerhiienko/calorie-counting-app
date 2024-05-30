<template>
  <div
    v-show="visible"
    class="glb-overlay popup-overlay"
    :class="{ 'with-modal': getModalOpened }"
  >
    <div class="glb-wrapper popup-wrapper">
      <svg
        :viewBox="svg['close-popup'].viewBox"
        @click="close"
      >
        <path :d="svg['close-popup'].path" />
      </svg>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import svgJSON from '../../assets/svg/svg.json';
  import { mapGetters } from 'vuex';

  export default {
    name: 'PopupComponent',
    props: {
      visible: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    computed: {
      ...mapGetters(['getModalOpened']),
      svg() {
        return svgJSON;
      },
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
    emits: ['close'],
  };
</script>

<style
  lang="scss"
  scoped
>
  .popup-overlay {
    z-index: 2;
    padding: 20px 20px 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.with-modal {
      top: -22px;
    }
  }

  .popup-wrapper {
    width: fit-content;
    display: flex;
    flex-direction: column;

    svg {
      align-self: flex-end;
      width: 18px;
      fill: $primary-text-color;
      transition: $transition;
      cursor: pointer;

      &:hover {
        fill: $primary-hover-color;
      }
    }
  }
</style>
