<template>
  <div class="wrapper">
    <div class="modes">
      <span class="modes-title">Search by</span>
      <div class="glb-radio">
        <input
          type="radio"
          id="byProduct"
          v-model="searchMode"
          value="byProduct"
          required
        />
        <label for="byProduct">product</label>
      </div>
      <div class="glb-radio">
        <input
          type="radio"
          id="byBrand"
          v-model="searchMode"
          value="byBrand"
          required
        />
        <label for="byBrand">brand</label>
      </div>
    </div>
    <input
      class="glb-input input"
      type="text"
      v-model="searchTerm"
      placeholder="search..."
      @input="fetchFoodData"
    />
    <p
      class="warning"
      v-show="this.searchTerm && this.searchTerm.trim().length < 3"
    >
      Write at least 3 characters
    </p>
    <p
      class="warning"
      v-show="this.searchTerm.trim().length >= 3 && database.length === 0"
    >
      There don't appear to be any matches in our database.<br />Try changing
      your search parameters or adding/removing search characters
    </p>
    <ul v-show="searchTerm != ''">
      <li
        v-for="food in database"
        :key="food.id"
        @click="saveEditedFood(food)"
      >
        {{ food.name }} {{ food.caloriesPer100g.toFixed(0) }} kcal
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'FoodSearch',
    data() {
      return {
        searchMode: 'byProduct',
        database: [],
        searchTerm: '',
      };
    },
    watch: {
      searchMode(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.fetchFoodData();
        }
      },
    },
    methods: {
      saveEditedFood(food) {
        this.$emit('save-edited-food', food);
      },
      fetchFoodData() {
        this.database = [];

        const YOUR_APP_ID = '046ed667';
        const YOUR_APP_KEY = '8b15766259bbcafcf98ada070c50c7c6';

        const processedSearchTerm = this.searchTerm;

        const optionSearch = this.searchMode === 'byProduct' ? 'ingr' : 'brand';

        if (this.searchTerm.trim().length >= 3) {
          axios
            .get(
              `https://api.edamam.com/api/food-database/v2/parser?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&${optionSearch}=${processedSearchTerm}`
            )
            .then((response) => {
              const { data } = response;
              const uniqueFoods = new Map();

              data.hints.forEach((item) => {
                const { foodId } = item.food;
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
              // eslint-disable-next-line
              console.error('Error fetching data:', error);
            });
        }
      },
    },
    emits: ['save-edited-food'],
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
  }

  .modes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .modes-title {
    font-weight: bold;
    color: $primary-color;
  }

  .input {
    width: 100%;
  }

  .warning {
    font-size: 12px;
    padding: 10px;
    color: $secondary-color-dark;
  }
</style>
