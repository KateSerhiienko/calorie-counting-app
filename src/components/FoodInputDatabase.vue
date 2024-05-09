<template>
  <div v-if="Object.keys(selectedFood).length === 0">
    <food-search @save-edited-food="saveEditedFood" />
  </div>

  <div v-else>
    <food-item
      :food="selectedFood"
      @save-edited-food="saveEditedFood"
      @remove-food="removeFood"
    ></food-item>
  </div>
</template>

<script>
  import FoodItem from './FoodItem.vue';
  import FoodSearch from './common/FoodSearchComponent.vue';

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
