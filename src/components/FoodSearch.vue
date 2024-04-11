<template>
  <div>
    <button @click="switchInputMode('byName')">search by product name</button>
    <button @click="switchInputMode('byBrand')">search by brand</button>
  </div>
  <input
    type="text"
    v-model="searchTerm"
    placeholder="Search food..."
    @input="fetchFoodData"
  />
  <p v-show="this.searchTerm && this.searchTerm.trim().length < 3">
    Write at least 3 characters
  </p>
  <ul v-show="searchTerm != ''">
    <li v-for="food in database" :key="food.id" @click="saveEditedFood(food)">
      {{ food.name }} {{ food.caloriesPer100g.toFixed(0) }} kcal
    </li>
  </ul>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      searchMode: 'byName',
      database: [],
      searchTerm: '',
    };
  },
  methods: {
    switchInputMode(mode) {
      this.searchMode = mode;
      this.fetchFoodData();
    },
    saveEditedFood(food) {
      this.$emit('save-edited-food', food);
    },
    fetchFoodData() {
      this.database = [];

      const YOUR_APP_ID = '046ed667';
      const YOUR_APP_KEY = '8b15766259bbcafcf98ada070c50c7c6';

      let processedSearchTerm = this.searchTerm;

      let optionSearch = this.searchMode === 'byName' ? 'ingr' : 'brand';

      if (this.searchTerm.trim().length >= 3) {
        axios
          .get(
            `https://api.edamam.com/api/food-database/v2/parser?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&${optionSearch}=${processedSearchTerm}`
          )
          .then((response) => {
            const data = response.data;
            const uniqueFoods = new Map();

            data.hints.forEach((item) => {
              const foodId = item.food.foodId;
              if (!uniqueFoods.has(foodId)) {
                uniqueFoods.set(foodId, {
                  id: foodId,
                  name: item.food.label,
                  caloriesPer100g: item.food.nutrients.ENERC_KCAL,
                });
              }
            });
            this.database = Array.from(uniqueFoods.values());
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }
    },
  },
  emits: ['save-edited-food'],
};
</script>
