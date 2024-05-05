<template>
  <div class="wrapper">
    <h3>User Details</h3>
    <div class="user">
      <ul class="user-data">
        <li>
          <span>Sex:</span>
          <span>{{ getCaloriesAndUserData.sex }}</span>
        </li>
        <li>
          <span>Weight:</span>
          <span>{{ getCaloriesAndUserData.weight }} kg</span>
        </li>
        <li>
          <span>Height:</span>
          <span>{{ getCaloriesAndUserData.height }} cm</span>
        </li>
        <li>
          <span>Age:</span>
          <span>{{ getCaloriesAndUserData.age }} years</span>
        </li>
        <li>
          <span>Activity Level:</span>
          <span> {{ getCaloriesAndUserData.activity }}</span>
        </li>
      </ul>
      <!-- <svg
        class="user-image"
        :viewBox="svg['user-avatar'].viewBox"
      >
        <path :d="svg['user-avatar'].path" />
      </svg> -->
    </div>
    <p class="total">
      <span class="total-title">Total<br />Calories:</span>
      <span class="total-calories">{{
        getCaloriesAndUserData.totalDailyEnergyExpenditure.toFixed(0)
      }}</span>
      <span class="total-unit">per<br />day</span>
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
      ...mapGetters(['getCaloriesAndUserData']),
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
></style>
