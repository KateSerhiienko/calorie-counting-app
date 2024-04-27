<template>
  <div class="wrapper">
    <div
      v-for="(mealtime, index) in getMealtimeMap"
      :key="index"
    >
      <div v-if="filteredFoods(mealtime).length > 0">
        <h2>{{ mealtime }}</h2>
        <ol>
          <li
            v-for="(food, foodIndex) in filteredFoods(mealtime)"
            :key="foodIndex"
          >
            <food-item
              :food="food"
              @save-edited-food="saveEditedFood"
              @remove-food="removeFood"
            ></food-item>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FoodItem from './FoodItem.vue';

  export default {
    name: 'FoodsList',
    components: {
      FoodItem,
    },
    computed: {
      ...mapGetters(['getMealtimeMap', 'getFoodsList']),
    },
    methods: {
      filteredFoods(mealtime) {
        return this.getFoodsList.filter((food) => food.mealtime === mealtime);
      },
      saveEditedFood(food) {
        this.$store.commit('updateFood', food);
        // todo - alert "food saved"
      },
      removeFood(id) {
        this.$store.commit('deleteFood', id);
        // todo - alert "food removed"
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    padding: 20px;
    background: $background-color-light;
    border-radius: $border-radius;
    padding-bottom: 43px;
    box-shadow: $box-shadow;
  }
</style>
