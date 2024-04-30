<template>
  <div v-if="getCaloriesAndUserData.totalDailyEnergyExpenditure">
    <div>
      <span>Total:</span>
      <span>
        {{ getCaloriesAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}
      </span>
      <span>kcal</span>
    </div>
    <div>
      <span :class="{ exceed: isCaloriesExceed }">{{
        caloriesUsedPercentage.toFixed(0)
      }}</span>
    </div>
    <div>
      <div>
        <span>{{ totalCountedCalories.toFixed(0) }}</span>
        <span>kcal used</span>
      </div>
      <div :class="{ exceed: isCaloriesExceed }">
        <span>{{ Math.abs(caloriesDifference.toFixed(0)) }}</span>
        <span v-if="!isCaloriesExceed">kcal left</span>
        <span v-else>kcal exceed</span>
      </div>
    </div>
  </div>
  <div v-else>
    <span>{{ totalCountedWeight.toFixed(0) }} grams</span>
    <span>{{ totalCountedCalories.toFixed(0) }} kcal</span>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'FoodsListTotal',
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
      caloriesUsedPercentage() {
        return (
          (this.totalCountedCalories /
            this.getCaloriesAndUserData.totalDailyEnergyExpenditure) *
          100
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
