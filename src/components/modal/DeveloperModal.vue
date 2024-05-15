<template>
  <div class="glb-wrapper developer-wrapper">
    <h2>Kateryna Serhiienko</h2>
    <p>09599 Freiberg Germany</p>
    <div class="media">
      <a
        v-for="(mediaItem, index) in getMedia"
        :key="mediaItem.title"
        :href="mediaItem.href"
        :title="mediaItem.title"
        target="_blank"
      >
        <svg :viewBox="svg[`media-item-${index + 1}`].viewBox">
          <path :d="svg[`media-item-${index + 1}`].path" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'DeveloperModal',
    computed: {
      ...mapGetters(['getMedia']),
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
  .developer-wrapper {
    h2 {
      font-size: 20px;
      margin-bottom: $container-padding;
    }

    p {
      margin-bottom: calc($container-padding * 2);
    }

    .media {
      display: flex;
      justify-content: space-between;
    }

    a {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:nth-child(1) {
        background-color: $secondary-color-lavender;
      }
      &:nth-child(2) {
        background-color: $secondary-color-beige;
      }
      &:nth-child(3) {
        background-color: $secondary-color-blue;
      }
      &:nth-child(4) {
        background-color: $secondary-color-pink;
      }
    }

    svg {
      width: 54px;
      fill: $secondary-bg-color;
    }
  }
</style>
