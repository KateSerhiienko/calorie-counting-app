<template>
  <br />
  <div v-if="Object.keys(selectedFood).length === 0">
    <food-search @save-edited-food="saveEditedFood" />
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
import FoodSearch from './FoodSearch.vue';

export default {
  name: 'FoodInputDatabase',
  components: {
    FoodItem,
    FoodSearch,
  },
  data() {
    return {
      selectedFood: {},
    };
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
