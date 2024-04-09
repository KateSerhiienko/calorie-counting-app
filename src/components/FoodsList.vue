<template>
  <ol>
    <li v-for="(food, index) in foodsList" :key="index">
      <span>{{ food.name }}</span>
      <span>{{ food.weight }} grams</span>
      <span>{{ food.calories }} kcal</span>
    </li>
  </ol>
  <div>
    <span>Total:</span>
    <span>{{ totalWeight }} grams</span>
    <span>{{ totalCalories }} kcal</span>
  </div>
</template>

<script>
export default {
  props: {
    foodsList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalWeight() {
      return this.foodsList.reduce((total, food) => total + food.weight, 0);
    },
    totalCalories() {
      return this.foodsList.reduce((total, food) => total + food.calories, 0);
    },
  },
};
</script>

<style scoped>
span {
  margin-right: 10px;
}
</style>
