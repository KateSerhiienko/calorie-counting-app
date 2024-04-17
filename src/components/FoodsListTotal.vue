<template>
  <div>
    <span>Total:</span>
    <span>{{ totalCountedWeight.toFixed(0) }} grams</span>
    <span>{{ totalCountedCalories.toFixed(0) }} kcal</span>
  </div>
  <div v-if="getCalorieAndUserData">
    total calories per day:
    {{
      getCalorieAndUserData.totalDailyEnergyExpenditure
        ? getCalorieAndUserData.totalDailyEnergyExpenditure.toFixed(0)
        : 'N/A'
    }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FoodsListTotal',
  computed: {
    ...mapGetters(['getFoodsList', 'getCalorieAndUserData']),
    totalCountedWeight() {
      return this.getFoodsList.reduce((total, food) => total + food.weight, 0);
    },
    totalCountedCalories() {
      return this.getFoodsList.reduce(
        (total, food) => total + (food.caloriesPer100g / 100) * food.weight,
        0,
      );
    },
  },
};
</script>
