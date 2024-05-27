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
      min-width: 50%;

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
    }

    .img-wrapper {
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 76px;
      height: 76px;
      margin-bottom: $container-padding;
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

  @include respond-to-tablet-and-desktop {
    .mealtime-wrapper {
      .img-wrapper {
        width: 126px;
        height: 126px;
      }

      svg {
        width: 86px;
      }

      p {
        font-size: 22px;
      }
    }
  }
</style>
