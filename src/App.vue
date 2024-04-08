<template>
  <h1>Calorie Counting App</h1>
  <div>
    <p>Name of the food</p>
    <input type="string" v-model="foodName" />
    <p>Calorie content per 100g</p>
    <input type="number" v-model="caloriesPer100g" />
    <p>Amount of food eaten in grams</p>
    <input type="number" v-model="foodWeight" />
    <br />
    <br />
    <button type="button" @click="addFood">Add</button>
  </div>
  <br />
  <ol>
    <li v-for="(food, index) in foodsList" :key="index">
      <span>{{ food.name }}</span>
      <span>{{ food.weight }} grams</span>
      <span>{{ food.calories }} kcal</span>
    </li>
  </ol>
  <div>
    <span>Total:</span>
    <span>{{ totalWeight }} grams</span>
    <span>{{ totalCalories }} kcal</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      foodName: '',
      caloriesPer100g: 0,
      foodWeight: 0,
      foodsList: [],
    };
  },
  methods: {
    addFood() {
      const calories = (this.caloriesPer100g / 100) * this.foodWeight;
      const foodToAdd = {
        name: this.foodName,
        weight: this.foodWeight,
        calories: calories,
      };
      this.foodsList.push(foodToAdd);
    },
  },
  computed: {
    totalWeight() {
      return this.foodsList.reduce((total, food) => total + food.weight, 0);
    },
    totalCalories() {
      return this.foodsList.reduce((total, food) => total + food.calories, 0);
    },
  },
};
</script>

<style scoped>
span {
  margin-right: 10px;
}
</style>
