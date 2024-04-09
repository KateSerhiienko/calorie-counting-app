<template>
  <h1>Calorie Counting App</h1>
  <div>
    <p>Name of the food</p>
    <input type="string" v-model="foodName" />
    <p>Calorie content per 100g</p>
    <input type="number" v-model="caloriesPer100g" />
    <p>Amount of food eaten in grams</p>
    <input type="number" v-model="foodWeight" />
    <br />
    <br />
    <button type="button" @click="addFood">Add</button>
  </div>
  <br />
  <foods-list :foods-list="foodsList"></foods-list>
</template>

<script>
import foodsList from './components/FoodsList.vue';

export default {
  name: 'App',
  components: {
    foodsList,
  },
  data() {
    return {
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 0,
      foodsList: [],
    };
  },
  methods: {
    addFood() {
      // check input validity
      if (
        this.foodName.trim() === '' ||
        this.caloriesPer100g < 0 ||
        this.foodWeight <= 0
      ) {
        console.log('Error');
        // todo - Error message
        return;
      }

      // calculate calories
      let calories = 0;
      if (this.caloriesPer100g > 0) {
        calories = (this.caloriesPer100g / 100) * this.foodWeight;
      }

      // round weight and calories to integers
      const roundedWeight = Math.round(this.foodWeight);
      const roundedCalories = Math.round(calories);

      // add the food to the list
      const foodToAdd = {
        name: this.foodName,
        weight: roundedWeight,
        calories: roundedCalories,
      };
      this.foodsList.push(foodToAdd);

      // clear input fields
      this.clearInputFields();
    },
    clearInputFields() {
      this.foodName = '';
      this.caloriesPer100g = 0;
      this.foodWeight = 0;
    },
  },
};
</script>
