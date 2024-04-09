<template>
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
</template>

<script>
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'FoodInput',
  props: {
    mealtimeMap: Array,
  },
  data() {
    return {
      mealtime: 'unnamed',
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 1,
    };
  },
  methods: {
    addFood() {
      if (
        this.foodName.trim() === '' ||
        this.caloriesPer100g < 0 ||
        this.foodWeight <= 0
      ) {
        console.log('Error');
        // todo - Error message
        return;
      }

      const foodToAdd = {
        id: uuidv4(),
        mealtime: this.mealtime,
        name: this.foodName,
        weight: this.foodWeight,
        caloriesPer100g: this.caloriesPer100g,
      };
      this.$emit('food-added', foodToAdd);

      this.clearInputFields();
    },
    clearInputFields() {
      this.foodName = '';
      this.caloriesPer100g = 0;
      this.foodWeight = 1;
    },
  },
  emits: ['food-added'],
};
</script>
