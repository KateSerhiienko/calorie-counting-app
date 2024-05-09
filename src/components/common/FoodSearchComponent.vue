<template>
  <svg
    :viewBox="svg['loupe'].viewBox"
    @click="close"
  >
    <path :d="svg['loupe'].path" />
  </svg>
  <input
    type="text"
    v-model="searchTerm"
    placeholder="Search in food database"
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
    There don't appear to be any matches in our database.<br />Try changing your
    search parameters or adding/removing search characters
  </p>
  <ul
    class="search-list"
    v-show="searchTerm != ''"
  >
    <li
      class="search-list-item"
      v-for="food in database"
      :key="food.id"
      :title="food.name"
      @click="selectFood(food)"
    >
      <span class="search-list-item-title">{{ food.name }}</span>
      <span>{{ food.kcalPer100g.toFixed(0) }} kcal</span>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'FoodSearchComponent',
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
    computed: {
      svg() {
        return svgJSON;
      },
    },
    methods: {
      selectFood(food) {
        this.$emit('select-food', food);
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
                kcalPer100g: item.caloriesPer100g,
              }));
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error('Error fetching data:', error);
            });
        }
      },
    },
    emits: ['select-food'],
  };
</script>

<style
  lang="scss"
  scoped
>
  svg {
    width: 32px;
    stroke: #000000;
    fill: transparent;
    stroke-width: 2;
  }
</style>
