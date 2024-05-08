<template>
  <div class="modal mealtime-wrapper">
    <ul>
      <li
        v-for="mealtime in getMealtimeList"
        :key="mealtime"
        @click="setModalOpened('add-food')"
      >
        <svg :viewBox="svg[`mealtime-${mealtime}`].viewBox">
          <path :d="svg[`mealtime-${mealtime}`].path" />
        </svg>
        <p>{{ mealtime }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'MealtimeModal',
    computed: {
      ...mapGetters(['getMealtimeList']),
      svg() {
        return svgJSON;
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
  .mealtime-wrapper {
    svg {
      width: 50px;
      fill: none;
      stroke: #000000;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-miterlimit: 10;
    }

    p {
      text-transform: capitalize;
    }
  }
</style>
