<template>
  <div v-for="(mealtime, index) in mealtimeMap" :key="index">
    <div v-if="filteredFoods(mealtime).length > 0">
      <h2>{{ mealtime }}</h2>
      <ol>
        <li
          v-for="(food, foodIndex) in filteredFoods(mealtime)"
          :key="foodIndex"
        >
          <foods-list-item
            :food="food"
            :countedCalories="countedCalories"
            @remove="removeFood"
            @edit="editFood"
          ></foods-list-item>
          <food-edit
            v-if="food.id === editId"
            :food="food"
            :editId="editId"
            :editedFood="editedFood"
            @save-edited-food="saveEditedFood(food.id)"
          ></food-edit>
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
import FoodsListItem from './FoodsListItem.vue';
import FoodEdit from './FoodEdit.vue';
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
    FoodEdit,
    FoodsListItem,
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
