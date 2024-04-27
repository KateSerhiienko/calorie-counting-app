<template>
  <div class="wrapper">
    <h3>User Details</h3>
    <div class="user">
      <ul class="user-data">
        <li>
          <span>Sex:</span>
          <span>{{ getCalorieAndUserData.sex }}</span>
        </li>
        <li>
          <span>Weight:</span>
          <span>{{ getCalorieAndUserData.weight }} kg</span>
        </li>
        <li>
          <span>Height:</span>
          <span>{{ getCalorieAndUserData.height }} cm</span>
        </li>
        <li>
          <span>Age:</span>
          <span>{{ getCalorieAndUserData.age }} years</span>
        </li>
        <li>
          <span>Activity Level:</span>
          <span> {{ getCalorieAndUserData.activity }}</span>
        </li>
      </ul>
      <svg
        class="user-image"
        :viewBox="svg['user-avatar'].viewBox"
      >
        <path :d="svg['user-avatar'].path" />
      </svg>
    </div>
    <p class="total">
      <span class="total-title">Total<br />Calories:</span>
      <span class="total-calories">{{
        getCalorieAndUserData.totalDailyEnergyExpenditure.toFixed(0)
      }}</span>
      <span class="total-text">per<br />day</span>
    </p>
    <button
      type="button"
      class="glb-button button"
      @click="setCountingMode(true)"
    >
      recalculate
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import svgJSON from '../assets/svg/svg.json';

  export default {
    name: 'CalorieCountingTotal',
    computed: {
      ...mapGetters(['getCalorieAndUserData']),
      svg() {
        return svgJSON;
      },
    },
    methods: {
      ...mapMutations(['setCountingMode']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .user {
    position: relative;
    border-radius: $border-radius;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      $primary-color-light 43%,
      $primary-color 43%
    );
    padding: 18px;
    /* box-shadow: $box-shadow; */
  }

  .user-data {
    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      display: inline-block;
      line-height: 1.5;

      &:nth-child(even) {
        width: 146px;
        color: $background-color-light;
      }
    }
  }

  .user-image {
    width: 80px;
    fill: $background-color-light;
    position: absolute;
    right: 18px;
    top: 18px;
    /* filter: drop-shadow($box-shadow); */
  }

  .total {
    font-family: Ubuntu;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    line-height: 1;
    height: 50px;
  }

  .total-title {
    font-size: 20px;
    color: $primary-color-dark;
    align-self: start;
  }

  .total-calories {
    font-size: 70px;
    color: $reserve-color-1;
    align-self: center;
  }

  .total-text {
    color: $primary-color-dark;
    align-self: end;
  }

  .button {
    align-self: end;
  }
</style>
