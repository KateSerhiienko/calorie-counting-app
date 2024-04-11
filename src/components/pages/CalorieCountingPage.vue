<template>
  <h3>Calorie Counting</h3>
  <food-input></food-input>
  <foods-list></foods-list>
</template>

<script>
import FoodInput from '../FoodInput.vue';
import FoodsList from '../FoodsList.vue';
export default {
  name: 'CalorieCountingPage',
  components: {
    FoodInput,
    FoodsList,
  },
};
</script>
