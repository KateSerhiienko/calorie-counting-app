<template>
  <div>
    <button @click="switchInputMode('database')">Data</button>
    <button @click="switchInputMode('manual')">Enter</button>
  </div>

  <div>
    <div>
      <p>Mealtime</p>
      <select v-model="mealtime">
        <option v-for="mealtimeName in mealtimeMap" :key="mealtimeName">
          {{ mealtimeName }}
        </option>
      </select>
    </div>

    <div v-show="inputMode === 'database'">
      <food-input-database
        ref="foodInputDatabase"
        @select-food-from-database="selectFoodFromDatabase"
      />
    </div>

    <div v-show="inputMode === 'manual'">
      <p>Name of the food</p>
      <input type="text" v-model="foodName" />
      <p>Calorie content per 100g</p>
      <input type="number" v-model="caloriesPer100g" min="0" />
    </div>

    <div>
      <p>Amount of food eaten in grams</p>
      <input type="number" v-model="foodWeight" min="1" />
    </div>

    <div>
      <br />
      <button type="button" @click="addFood">Add</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapGetters } from 'vuex';
import FoodInputDatabase from './FoodInputDatabase.vue';

export default {
  name: 'FoodInput',
  components: {
    FoodInputDatabase,
  },
  data() {
    return {
      inputMode: 'database',
      mealtime: 'unnamed',
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 1,
    };
  },
  computed: {
    ...mapGetters(['mealtimeMap']),
  },
  methods: {
    switchInputMode(mode) {
      this.inputMode = mode;
      this.resetInputFields();
    },
    selectFoodFromDatabase(food) {
      this.foodName = food.name;
      this.caloriesPer100g = food.caloriesPer100g;
    },
    addFood() {
      if (!this.validateInput()) {
        console.log('Error: Invalid input.');
        return;
      }

      const foodToAdd = {
        id: uuidv4(),
        mealtime: this.mealtime,
        name: this.foodName,
        weight: this.foodWeight,
        caloriesPer100g: this.caloriesPer100g,
      };

      this.$store.dispatch('setFoodsList', [
        ...this.$store.getters.foodsList,
        foodToAdd,
      ]);

      this.resetInputFields();
    },
    resetInputFields() {
      this.foodName = '';
      this.caloriesPer100g = 0;
      this.foodWeight = 1;
      // this.$refs.foodInputDatabase.removeFood();
      // this.$refs.foodInputDatabase.removeTerm();
    },
    validateInput() {
      if (
        this.foodName.trim() === '' ||
        this.caloriesPer100g < 0 ||
        this.foodWeight <= 0
      ) {
        console.log('Error: Invalid food information.');
        return false;
      }

      return true;
    },
  },
};
</script>
