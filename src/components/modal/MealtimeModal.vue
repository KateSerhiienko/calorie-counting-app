<template>
  <ul class="mealtime-wrapper">
    <li
      v-for="mealtime in getMealtimeList"
      :key="mealtime"
      @click="setModalOpened('add-food'), setMealtimeOfFood(mealtime)"
    >
      <div class="img-wrapper">
        <svg :viewBox="svg[`mealtime-${mealtime}`].viewBox">
          <path :d="svg[`mealtime-${mealtime}`].path" />
        </svg>
      </div>
      <p>{{ mealtime }}</p>
    </li>
  </ul>
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
      ...mapMutations(['setModalOpened', 'setMealtimeOfFood']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .mealtime-wrapper {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    row-gap: calc($container-padding * 2);

    li {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: calc(25% - 76px / 2);
      margin-right: calc(25% - 76px / 2);
      cursor: pointer;
      transition: $transition;

      &:nth-child(1) .img-wrapper {
        background-color: $secondary-color-lavender;
      }
      &:nth-child(2) .img-wrapper {
        background-color: $secondary-color-beige;
      }
      &:nth-child(3) .img-wrapper {
        background-color: $secondary-color-blue;
      }
      &:nth-child(4) .img-wrapper {
        background-color: $secondary-color-pink;
      }

      &:hover {
        color: $primary-hover-color;

        .img-wrapper {
          background-color: $primary-hover-color;
        }
      }
    }

    .img-wrapper {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 76px;
      height: 76px;
      margin-bottom: $container-padding;
      transition: $transition;
    }

    svg {
      width: 46px;
      fill: none;
      stroke: $secondary-bg-color;
    }

    p {
      text-transform: capitalize;
      font-weight: bold;
    }
  }
</style>
