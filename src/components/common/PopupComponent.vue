<template>
  <div
    v-show="visible"
    class="popup-wrapper"
  >
    <svg
      :viewBox="svg['close-popup'].viewBox"
      @click="close"
    >
      <path :d="svg['close-popup'].path" />
    </svg>
    <slot></slot>
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

<style>
  .popup-wrapper {
    svg {
      width: 32px;
    }
  }
</style>
