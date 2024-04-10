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
    totalWeight: {
      type: Number,
      required: true,
    },
    totalCalories: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
span {
  margin-right: 10px;
}
</style>
