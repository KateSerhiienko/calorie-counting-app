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
>
  .total-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 44%;
    height: 100%;
    text-transform: none;
    font-weight: normal;
    padding-bottom: 24px;
  }

  .total-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1;
    margin-right: 6px;
  }

  .total-left-title {
    font-size: 18px;
    align-self: start;
  }

  .total-left-value {
    font-size: 40px;
    color: $reserve-color-1;
    align-self: center;
    font-weight: bold;
  }

  .total-left-unit {
    align-self: end;
  }

  .total-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .total-right-item {
    display: flex;
    align-items: center;
    justify-content: end;
    text-align: right;

    &:nth-child(1) {
      color: $primary-color-dark;
    }
  }

  .total-right-value {
    font-size: 30px;
    font-weight: bold;
    width: 100%;
  }

  .total-right-unit {
    font-size: 12px;
    line-height: 0.9;
    width: 40px;
  }

  .chart-wrapper {
    width: 100px;
    height: 100px;
    position: relative;
  }

  .total-wrapper-small {
    padding: 50px 0 0 30px;
    height: auto;
    font-size: 26px;
    align-items: flex-start;
  }

  .total-title {
    text-transform: uppercase;
    font-weight: bold;
  }

  .total-values {
    font-weight: bold;
    font-size: 20px;
    text-align: right;

    & p:nth-child(1) {
      color: $reserve-color-1;
      font-size: 30px;
    }
  }
</style>
