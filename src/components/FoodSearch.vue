<template>
  <div class="wrapper">
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
    <ul
      class="search-list"
      v-show="searchTerm != ''"
    >
      <li
        class="search-list-item"
        v-for="food in database"
        :key="food.id"
        @click="saveEditedFood(food)"
        :title="food.name"
      >
        <span class="search-list-item-title">{{ food.name }}</span>
        <span>{{ food.caloriesPer100g.toFixed(0) }} kcal</span>
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

        const processedSearchTerm = this.searchTerm;

        if (this.searchTerm.trim().length >= 3) {
          axios
            .get(
              `https://node-server-v342.onrender.com/api/products?title=${processedSearchTerm}`
            )
            .then((response) => {
              const { data } = response;
              this.database = data.map((item) => ({
                id: item._id,
                name: item.name,
                caloriesPer100g: item.caloriesPer100g,
              }));
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

    &:focus {
      box-shadow: none;
    }
  }

  .search-list {
    height: 140px;
    overflow-y: auto;
    padding: 0 10px;
  }

  .search-list-item {
    display: inline-block;
    font-size: 12px;
    line-height: 1.7;
    width: 100%;
    cursor: pointer;
    transition: $transition;
    padding: 1px 2px;
    display: flex;
    justify-content: space-between;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      width: 78%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent 84%,
        $background-color-light 100%
      );
    }

    &:nth-child(odd) {
      background-color: $background-color;
      color: $primary-color;

      &::after {
        background: linear-gradient(
          90deg,
          transparent 84%,
          $background-color 100%
        );
      }
    }

    &:hover {
      font-weight: bold;
    }
  }

  .search-list-item-title {
    max-width: 78%;
    white-space: nowrap;
    overflow: hidden;
  }

  .warning {
    font-size: 12px;
    padding: 10px;
    color: $secondary-color-dark;
  }
</style>
