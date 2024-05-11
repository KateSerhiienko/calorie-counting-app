<template>
  <ul>
    <li>Kateryna Serhiienko</li>
    <li>09599 Freiberg Germany</li>
    <li>april 2024</li>
  </ul>
  <ul>
    <li
      v-for="(mediaItem, index) in getMedia"
      :key="mediaItem.title"
    >
      <a
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
  svg {
    width: 60px;
    fill: $primary-text-color;
  }
</style>
