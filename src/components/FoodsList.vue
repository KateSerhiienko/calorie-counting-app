<template>
  <ol>
    <li v-for="(food, index) in foodsList" :key="food.id">
      <span>{{ food.name }}</span>
      <span>{{ food.weight.toFixed(0) }} grams</span>
      <span>{{ countedCalories[food.id].toFixed(0) }} kcal</span>
      <button type="button" @click="removeFood(index)">Remove</button>
      <button type="button" @click="editFood(index)">Edit</button>
      <div v-show="index === editIndex">
        <p>Name:</p>
        <input type="string" v-model="editedFood.name" />
        <p>Weight:</p>
        <input type="number" v-model="editedFood.weight" min="1" />
        <p>Calorie per 100g:</p>
        <input type="number" v-model="editedFood.caloriesPer100g" min="0" />
        <button type="button" @click="saveEditedFood(index)">Save</button>
      </div>
    </li>
  </ol>
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
      editIndex: -1,
      editedFood: {},
    };
  },
  props: {
    foodsList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeFood(index) {
      if (this.editIndex === -1) {
        this.foodsList.splice(index, 1);
      }
      // todo - alert "food removed"
    },
    editFood(index) {
      if (this.editIndex === -1) {
        this.editIndex = index;
        this.editedFood = { ...this.foodsList[index] };
      }
    },
    saveEditedFood(index) {
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
      this.editIndex = -1;
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
