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
          <!-- <svg :viewBox="svg[`media-item-${index + 1}`].viewBox">
            <path :d="svg[`media-item-${index + 1}`].path" />
          </svg> -->
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
></style>
