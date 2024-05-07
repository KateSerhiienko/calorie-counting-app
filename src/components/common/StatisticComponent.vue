<template>
  <div
    v-if="getCaloriesAndUserData.totalDailyEnergyExpenditure"
    class="total-wrapper"
  >
    <chart-component
      :data-dasharray="[
        totalCountedCalories,
        getCaloriesAndUserData.totalDailyEnergyExpenditure,
      ]"
      :radius="'18px'"
    ></chart-component>

    <div>
      <p>{{ getCaloriesAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}</p>
      <p>kcal Total</p>
    </div>
    <div>
      <div>
        <p>{{ totalCountedCalories.toFixed(0) }}</p>
        <p>kcal Used</p>
      </div>
      <div :class="{ exceed: isCaloriesExceed }">
        <p>{{ Math.abs(caloriesDifference.toFixed(0)) }}</p>
        <p>kcal {{ !isCaloriesExceed ? 'Left' : 'Over' }}</p>
      </div>
    </div>
  </div>

  <div
    v-else
    class="total-wrapper no-data"
  >
    <div>
      <p>
        For more detailed visual information, we advise you to calculate your
        daily calorie allowance:
      </p>
      <router-link :to="'/edit_profile'">
        <button type="button">calculate</button></router-link
      >
    </div>
    <div>
      <p class="total-title">Total used:</p>
      <p>{{ totalCountedCalories.toFixed(0) }} <span>kcal</span></p>
      <p>{{ totalCountedWeight.toFixed(0) }} <span>g</span></p>
    </div>
  </div>
</template>

<script>
  import ChartComponent from '../common/ChartComponent.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'StatisticComponent',
    components: {
      ChartComponent,
    },
    computed: {
      ...mapGetters(['getFoodsList', 'getCaloriesAndUserData']),
      totalCountedWeight() {
        return this.getFoodsList.reduce(
          (total, food) => total + food.weight,
          0
        );
      },
      totalCountedCalories() {
        return this.getFoodsList.reduce(
          (total, food) => total + (food.caloriesPer100g / 100) * food.weight,
          0
        );
      },
      caloriesDifference() {
        return (
          this.getCaloriesAndUserData.totalDailyEnergyExpenditure -
          this.totalCountedCalories
        );
      },
      isCaloriesExceed() {
        return this.caloriesDifference < 0;
      },
    },
  };
</script>

<style
  lang="scss"
  scoped
></style>