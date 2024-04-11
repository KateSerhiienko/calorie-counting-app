<template>
  <div v-for="(mealtime, index) in mealtimeMap" :key="index">
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
  <foods-list-total></foods-list-total>
</template>

<script>
import { mapGetters } from 'vuex';
import FoodItem from './FoodItem.vue';
import FoodsListTotal from './FoodsListTotal.vue';

export default {
  name: 'FoodsList',
  components: {
    FoodItem,
    FoodsListTotal,
  },
  computed: {
    ...mapGetters(['mealtimeMap', 'foodsList']),
  },
  methods: {
    filteredFoods(mealtime) {
      return this.foodsList.filter((food) => food.mealtime === mealtime);
    },
    saveEditedFood(food) {
      const index = this.foodsList.findIndex((item) => item.id === food.id);
      if (index !== -1) {
        this.foodsList[index] = food;
        // todo - alert "food edited"
      }
    },
    removeFood(id) {
      const index = this.foodsList.findIndex((food) => food.id === id);
      if (index !== -1) {
        this.foodsList.splice(index, 1);
        // todo - alert "food removed"
      }
    },
  },
};
</script>
