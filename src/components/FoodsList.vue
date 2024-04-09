<template>
  <div v-for="(mealtime, index) in mealtimeMap" :key="index">
    <div v-if="filteredFoods(mealtime).length > 0">
      <h2>{{ mealtime }}</h2>
      <ol>
        <li
          v-for="(food, foodIndex) in filteredFoods(mealtime)"
          :key="foodIndex"
        >
          <div>
            <span>{{ food.name }}</span>
            <span>{{ food.weight.toFixed(0) }} grams</span>
            <span>{{ countedCalories[food.id].toFixed(0) }} kcal</span>
            <button type="button" @click="removeFood(food.id)">Remove</button>
            <button type="button" @click="editFood(food.id)">Edit</button>
          </div>

          <div v-show="food.id === editId">
            <p>Name:</p>
            <input type="string" v-model="editedFood.name" />
            <p>Weight:</p>
            <input type="number" v-model="editedFood.weight" min="1" />
            <p>Calorie per 100g:</p>
            <input type="number" v-model="editedFood.caloriesPer100g" min="0" />
            <button type="button" @click="saveEditedFood(food.id)">Save</button>
          </div>
        </li>
      </ol>
    </div>
  </div>
  <div>
    <span>Total:</span>
    <span>{{ totalWeight.toFixed(0) }} grams</span>
    <span>{{ totalCalories.toFixed(0) }} kcal</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editId: -1,
      editedFood: {},
    };
  },
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
};
</script>

<style scoped>
span {
  margin-right: 10px;
}
</style>
