<template>
  <div class="loading-spinner-wrapper">
    <div class="spinner">
      <div class="double-bounce1"></div>
      <div class="double-bounce2"></div>
    </div>
    <div class="text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LoadingSpinnerComponent',
  };
</script>

<style
  scoped
  lang="scss"
>
  .loading-spinner-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .spinner {
      width: 40px;
      height: 40px;
      position: relative;
      margin: calc($container-padding * 2) auto;
    }

    .double-bounce1,
    .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      animation: bounce 2s infinite ease-in-out, color-change 8s infinite linear;
    }

    .double-bounce2 {
      animation-delay: -1s, 0s;
      opacity: 0.7;
    }

    @keyframes bounce {
      0%,
      100% {
        transform: scale(0);
      }
      50% {
        transform: scale(1);
      }
    }

    @keyframes color-change {
      0%,
      100% {
        background-color: $primary-color;
      }
      12.5% {
        background-color: $secondary-color-lavender;
      }
      37.5% {
        background-color: $secondary-color-beige;
      }
      62.5% {
        background-color: $secondary-color-blue;
      }
      87.5% {
        background-color: $secondary-color-pink;
      }
    }

    .text {
      max-width: 440px;
      text-align: center;
      @include secondary-text(10px);
    }
  }
</style>
