<template>
  <div>
    <span>Total:</span>
    <span>{{ totalWeight.toFixed(0) }} grams</span>
    <span>{{ totalCalories.toFixed(0) }} kcal</span>
  </div>
</template>

<script>
export default {
  name: 'FoodsListTotal',
  props: {
    foodsList: {
      type: Object,
      required: true,
    },
  },
  computed: {
    totalWeight() {
      return this.foodsList.reduce((total, food) => total + food.weight, 0);
    },
    totalCalories() {
      return this.foodsList.reduce(
        (total, food) => total + (food.caloriesPer100g / 100) * food.weight,
        0
      );
    },
  },
};
</script>
