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
            :countedCalories="countedCalories"
            :editId="editId"
            :editedFood="editedFood"
            @remove="removeFood"
            @edit="editFood"
            @save-edited-food="saveEditedFood"
          ></food-item>
        </li>
      </ol>
    </div>
  </div>
  <foods-list-total
    :totalWeight="totalWeight"
    :totalCalories="totalCalories"
  ></foods-list-total>
</template>

<script>
import FoodItem from './FoodItem.vue';
import FoodsListTotal from './FoodsListTotal.vue';

export default {
  name: 'FoodList',
  props: {
    foodsList: {
      type: Array,
      required: true,
    },
    mealtimeMap: {
      type: Object,
      required: true,
    },
  },
  components: {
    FoodItem,
    FoodsListTotal,
  },
  data() {
    return {
      editId: -1,
      editedFood: {},
    };
  },
  computed: {
    countedCalories() {
      const calories = {};
      this.foodsList.forEach((food) => {
        calories[food.id] = (food.caloriesPer100g / 100) * food.weight;
      });
      return calories;
    },
    totalWeight() {
      return this.foodsList.reduce((total, food) => total + food.weight, 0);
    },
    totalCalories() {
      const values = Object.values(this.countedCalories);
      return values.reduce((total, calories) => total + calories, 0);
    },
  },
  methods: {
    removeFood(id) {
      const index = this.foodsList.findIndex((food) => food.id === id);
      if (this.editId === -1) {
        this.foodsList.splice(index, 1);
      }
      // todo - alert "food removed"
    },
    editFood(id) {
      if (this.editId === -1) {
        this.editId = id;
        const food = this.foodsList.find((food) => food.id === id);
        this.editedFood = { ...food };
      }
    },
    saveEditedFood(id) {
      const index = this.foodsList.findIndex((food) => food.id === id);
      const editedFood = this.foodsList[index];
      if (
        this.editedFood.name.trim() === '' ||
        this.editedFood.weight <= 0 ||
        this.editedFood.caloriesPer100g < 0
      ) {
        console.log('Error');
        // todo - Error message
        return;
      }

      this.foodsList[index] = { ...this.editedFood };
      this.editId = -1;
    },
    filteredFoods(mealtime) {
      return this.foodsList.filter((food) => food.mealtime === mealtime);
    },
  },
};
</script>
