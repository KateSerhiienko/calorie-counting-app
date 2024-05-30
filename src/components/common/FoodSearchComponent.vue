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
      v-show="
        this.searchTerm.trim().length >= 3 &&
        !isLoading &&
        database.length === 0
      "
    >
      There don't appear to be any matches in our database. Try changing your
      search parameters or adding/removing search characters
    </p>
    <loading-spinner-component v-if="isLoading">
      <p v-if="showLoadMessage">
        Please wait while the data is loading. In rare cases, the loading
        process may take up to two minutes. We appreciate your patience!
      </p>
    </loading-spinner-component>
    <ul v-show="searchTerm !== '' && !isLoading && database.length > 0">
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
  import LoadingSpinnerComponent from './LoadingSpinnerComponent.vue';

  export default {
    name: 'FoodSearchComponent',
    components: {
      LoadingSpinnerComponent,
    },
    data() {
      return {
        database: [],
        searchTerm: '',
        isLoading: false,
        hasError: false,
        showLoadMessage: false,
        loadMessageTimeout: null,
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
        this.hasError = false;
        this.showLoadMessage = false;

        const processedSearchTerm = this.searchTerm;

        if (this.searchTerm.trim().length >= 3) {
          this.isLoading = true;

          this.loadMessageTimeout = setTimeout(() => {
            this.showLoadMessage = true;
          }, 5000);

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
              console.error('Error fetching data:', error);
              this.hasError = true;
            })
            .finally(() => {
              this.isLoading = false;
              clearTimeout(this.loadMessageTimeout);
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
      cursor: pointer;
      transition: $transition;

      &:hover {
        color: $primary-hover-color;
      }
    }

    .kcal {
      min-width: 60px;
      text-align: right;
    }
  }
</style>
