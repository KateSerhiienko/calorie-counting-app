<template>
  <h3>Calorie Counting</h3>
  <food-input @add-food="addFood"></food-input>
  <foods-list :foods-list="foodsList"></foods-list>
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
  data() {
    return {
      foodsList: [
        {
          id: 111,
          mealtime: 'lunch',
          name: 'food-1',
          weight: 100,
          caloriesPer100g: 100.5,
        },
        {
          id: 222,
          mealtime: 'lunch',
          name: 'food-2',
          weight: 100,
          caloriesPer100g: 102.5,
        },
        {
          id: 333,
          mealtime: 'breakfast',
          name: 'food-3',
          weight: 30,
          caloriesPer100g: 300,
        },
      ],
    };
  },
  methods: {
    addFood(food) {
      this.foodsList.push(food);
    },
  },
};
</script>
