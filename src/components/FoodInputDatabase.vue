<template>
  <br />
  <div v-if="Object.keys(selectedFood).length === 0">
    <input type="text" v-model="searchTerm" placeholder="Search food..." />
    <ul v-show="searchTerm != ''">
      <li
        v-for="food in filteredAndSortedDatabase"
        :key="food.name"
        @click="saveEditedFood(food)"
      >
        {{ food.name }} {{ food.caloriesPer100g }} kcal
      </li>
    </ul>
  </div>

  <div v-if="Object.keys(selectedFood).length > 0">
    <hr />
    <h3>{{ selectedFood.name }}</h3>
    <food-item
      :food="selectedFood"
      @save-edited-food="saveEditedFood"
      @remove-food="removeFood"
    ></food-item>
    <hr />
  </div>
</template>

<script>
import FoodItem from './FoodItem.vue';

export default {
  name: 'FoodInputDatabase',
  components: {
    FoodItem,
  },
  data() {
    return {
      database: [
        { id: 1111, name: 'Banana', caloriesPer100g: 300 },
        { id: 2222, name: 'Apple', caloriesPer100g: 200 },
        { id: 3333, name: 'Apricot', caloriesPer100g: 300 },
      ],
      searchTerm: '',
      selectedFood: {},
    };
  },
  computed: {
    filteredAndSortedDatabase() {
      return this.database
        .filter((food) => {
          return food.name
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase());
        })
        .sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
    },
  },
  methods: {
    saveEditedFood(food) {
      this.selectedFood = { ...food };
      this.$emit('select-food-from-database', this.selectedFood);
    },
    removeFood() {
      this.selectedFood = {};
    },
    removeTerm() {
      this.searchTerm = '';
    },
  },
  emits: ['select-food-from-database'],
};
</script>
