<template>
  <div
    v-show="visible"
    class="glb-overlay popup-overlay"
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
  }

  .popup-wrapper {
    width: fit-content;
    display: flex;
    flex-direction: column;

    svg {
      align-self: flex-end;
      width: 18px;
      fill: $primary-text-color;
    }
  }
</style>
