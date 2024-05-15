<template>
  <div class="food-search-wrapper">
    <div class="search">
      <svg
        :viewBox="svg['loupe'].viewBox"
        @click="close"
      >
        <path :d="svg['loupe'].path" />
      </svg>
      <input
        class="glb-input"
        type="text"
        v-model="searchTerm"
        placeholder="Search in food database"
        @input="fetchFoodData"
      />
    </div>
    <p
      class="glb-warning"
      v-show="this.searchTerm && this.searchTerm.trim().length < 3"
    >
      Write at least 3 characters
    </p>
    <p
      class="glb-warning"
      v-show="this.searchTerm.trim().length >= 3 && database.length === 0"
    >
      There don't appear to be any matches in our database.<br /><br />Try
      changing your search parameters or adding/removing search characters
    </p>
    <ul v-show="searchTerm != ''">
      <li
        v-for="food in database"
        :key="food.id"
        :title="food.name"
        @click="selectFood(food)"
      >
        <p>{{ food.name }}</p>
        <p class="kcal">{{ food.kcalPer100g.toFixed(0) }} kcal</p>
      </li>
    </ul>
  </div>
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
  .food-search-wrapper {
    height: 100%;
    overflow: hidden;

    .search {
      display: flex;
      position: relative;
    }

    svg {
      position: absolute;
      top: calc($container-padding / 2);
      left: calc($container-padding / 2);
      width: 32px;
      stroke: $not-active-light-color;
      fill: transparent;
      stroke-width: 1;
    }

    input {
      width: 100%;
      height: 44px;
      padding-left: calc(32px + $container-padding);
      border: 1px solid $not-active-light-color;
      border-radius: 10px;
    }

    ul {
      overflow: scroll;
      height: 100%;
      padding: $container-padding $container-padding 34px;
    }

    li {
      display: flex;
      justify-content: space-between;
      padding-bottom: $container-padding;
    }

    .kcal {
      min-width: 60px;
      text-align: right;
    }
  }
</style>
