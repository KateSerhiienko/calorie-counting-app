<template>
  <h1>Calorie Counting App</h1>
  <p>Mealtime</p>
  <select v-model="mealtime">
    <option v-for="mealtimeName in mealtimeMap" :key="mealtimeName">
      {{ mealtimeName }}
    </option>
  </select>
  <div>
    <p>Name of the food</p>
    <input type="string" v-model="foodName" />
    <p>Calorie content per 100g</p>
    <input type="number" v-model="caloriesPer100g" min="0" />
    <p>Amount of food eaten in grams</p>
    <input type="number" v-model="foodWeight" min="1" />
    <br />
    <br />
    <button type="button" @click="addFood">Add</button>
  </div>
  <br />
  <foods-list :foods-list="foodsList" :mealtime-map="mealtimeMap"></foods-list>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import foodsList from './components/FoodsList.vue';

export default {
  name: 'App',
  components: {
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
      mealtime: 'unnamed',
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 1,
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

      // add the food to the list
      const foodToAdd = {
        id: uuidv4(),
        mealtime: this.mealtime,
        name: this.foodName,
        weight: this.foodWeight,
        caloriesPer100g: this.caloriesPer100g,
      };
      this.foodsList.push(foodToAdd);

      // clear input fields
      this.clearInputFields();
    },
    clearInputFields() {
      this.foodName = '';
      this.caloriesPer100g = 0;
      this.foodWeight = 1;
    },
  },
};
</script>
