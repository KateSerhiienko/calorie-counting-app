<template>
  <div>
    <button @click="toggleMode('database')">Data</button>
    <button @click="toggleMode('manual')">Enter</button>
  </div>

  <div>
    <p>Mealtime</p>
    <select v-model="mealtime">
      <option v-for="mealtimeName in mealtimeMap" :key="mealtimeName">
        {{ mealtimeName }}
      </option>
    </select>

    <div v-show="inputMode === 'database'">
      <br />
      <input type="text" v-model="searchQuery" placeholder="Search food..." />
      <ul v-show="searchQuery != ''">
        <li
          v-for="food in filteredAndSortedDatabase"
          :key="food.id"
          @click="addFromDatabase(food)"
        >
          {{ food.name }} {{ food.caloriesPer100g }} kcal
        </li>
      </ul>
      <div v-show="foodName">
        {{ foodName }} {{ caloriesPer100g }}
        <button type="button">Edit</button>
      </div>
    </div>

    <div v-show="inputMode === 'manual'">
      <p>Name of the food</p>
      <input type="text" v-model="foodName" />
      <p>Calorie content per 100g</p>
      <input type="number" v-model="caloriesPer100g" min="0" />
    </div>

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
      inputMode: 'database',
      database: [
        { id: 1111, name: 'Banana', caloriesPer100g: 300 },
        { id: 2222, name: 'Apple', caloriesPer100g: 200 },
        { id: 3333, name: 'Apricot', caloriesPer100g: 300 },
      ],
      searchQuery: '',
      mealtime: 'unnamed',
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 1,
    };
  },
  computed: {
    filteredAndSortedDatabase() {
      return this.database
        .filter((food) => {
          return food.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
  },
  methods: {
    toggleMode(mode) {
      this.inputMode = mode;
      this.clearInputFields();
    },
    addFromDatabase(food) {
      this.searchQuery = food.name;
      this.foodName = food.name;
      this.caloriesPer100g = food.caloriesPer100g;
      this.searchQuery = '';
    },
    addFood() {
      if (!this.isValidInput()) {
        console.log('Error: Invalid input.');
        return;
      }

      if (this.inputMode === 'manual') {
        const existingFood = this.database.find(
          (food) => food.name.toLowerCase() === this.foodName.toLowerCase()
        );
        if (existingFood) {
          this.caloriesPer100g = existingFood.caloriesPer100g;
        }
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
      this.searchQuery = '';
    },
    isValidInput() {
      if (this.inputMode === 'database' && !this.searchQuery) {
        console.log('Error: Search query is empty.');
        return false;
      }

      if (
        this.foodName.trim() === '' ||
        this.caloriesPer100g <= 0 ||
        this.foodWeight <= 0
      ) {
        console.log('Error: Invalid food information.');
        return false;
      }

      return true;
    },
  },
  emits: ['food-added'],
};
</script>
