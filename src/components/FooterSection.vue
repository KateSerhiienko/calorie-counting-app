<template>
  <div class="wrapper">
    <ul class="info">
      <li class="info-item-header">Kateryna Serhiienko</li>
      <li class="info-item">09599 Freiberg Germany</li>
      <li class="info-item">april 2024</li>
    </ul>
    <ul class="media">
      <li
        v-for="(mediaItem, index) in getMedia"
        :key="mediaItem.title"
      >
        <a
          class="media-item"
          :href="mediaItem.href"
          :title="mediaItem.title"
          target="_blank"
        >
          <svg :viewBox="svg[`media-item-${index + 1}`].viewBox">
            <path :d="svg[`media-item-${index + 1}`].path" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../assets/svg/svg.json';

  export default {
    name: 'FooterSection',
    data() {
      return {
        disabled: false,
      };
    },
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
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $background-color;
  }

  .info-item-header {
    font-size: 12px;
    margin-bottom: 4px;
    font-weight: bold;
    opacity: 0.75;
  }

  .info-item {
    font-size: 10px;
    opacity: 0.75;
  }

  .media {
    display: flex;
  }

  .media-item {
    display: block;
    width: 50px;
    height: 50px;
    border: 2px solid $background-color;
    border-radius: 100%;
    fill: $background-color;
    opacity: 0.6;
    margin-left: 15px;
    transition: $transition;

    &:hover {
      opacity: 1;
      fill: $background-color-light;
      color: $background-color-light;
    }
  }
</style>
