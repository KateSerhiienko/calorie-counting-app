<template>
  <div
    v-if="getCaloriesAndUserData.totalDailyEnergyExpenditure"
    class="total-wrapper"
  >
    <div class="total-left">
      <span class="total-left-title">Total:</span>
      <span class="total-left-value">
        {{ getCaloriesAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}
      </span>
      <span class="total-left-unit">kcal</span>
    </div>
    <div class="chart-wrapper">
      <circle-chart
        :data-dasharray="[
          totalCountedCalories,
          getCaloriesAndUserData.totalDailyEnergyExpenditure,
        ]"
        :radius="'18px'"
      ></circle-chart>
    </div>
    <div class="total-right">
      <div class="total-right-item">
        <span class="total-right-value">{{
          totalCountedCalories.toFixed(0)
        }}</span>
        <span class="total-right-unit">kcal used</span>
      </div>
      <div
        class="total-right-item"
        :class="{ exceed: isCaloriesExceed }"
      >
        <span class="total-right-value">{{
          Math.abs(caloriesDifference.toFixed(0))
        }}</span>
        <span class="total-right-unit"
          >kcal {{ !isCaloriesExceed ? 'left' : 'over' }}</span
        >
      </div>
    </div>
  </div>
  <div
    v-else
    class="total-wrapper total-wrapper-small"
  >
    <p class="total-title">Total:</p>
    <div class="total-values">
      <p>{{ totalCountedCalories.toFixed(0) }} kcal</p>
      <p>{{ totalCountedWeight.toFixed(0) }} grams</p>
    </div>
  </div>
</template>

<script>
  import CircleChart from './CircleChart.vue';
  import { mapGetters } from 'vuex';

  export default {
    name: 'FoodsListTotal',
    components: {
      CircleChart,
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
