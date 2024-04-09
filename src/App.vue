<template>
  <h1>Calorie Counting App</h1>
  <food-input :mealtimeMap="mealtimeMap" @food-added="addFood"></food-input>
  <foods-list :foods-list="foodsList" :mealtime-map="mealtimeMap"></foods-list>
</template>

<script>
import foodInput from './components/FoodInput.vue';
import foodsList from './components/FoodsList.vue';

export default {
  name: 'App',
  components: {
    foodInput,
    foodsList,
  },
  data() {
    return {
      mealtimeMap: [
        'breakfast',
        'brunch',
        'lunch',
        'snack',
        'dinner',
        'supper',
        'unnamed',
      ],
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
