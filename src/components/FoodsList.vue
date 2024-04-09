<template>
  <ol>
    <li v-for="(food, index) in foodsList" :key="index">
      <span>{{ food.name }}</span>
      <span>{{ food.weight }} grams</span>
      <span>{{ food.calories }} kcal</span>
      <button type="button" @click="removeFood(index)">Remove</button>
      <button type="button" @click="editFood(index)">Edit</button>
      <div v-show="index === editIndex">
        <input type="string" v-model="editedFood.name" />
        <input type="number" v-model="editedFood.weight" min="1" />
        <input type="number" v-model="editedFood.calories" min="0" />
        <button type="button" @click="saveEditedFood(index)">Save</button>
      </div>
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
      return this.foodsList.splice(index, 1);
      // todo - alert "food removed"
    },
    editFood(index) {
      this.editIndex = index;
      this.editedFood = { ...this.foodsList[index] };
    },
    saveEditedFood(index) {
      const editedFood = this.foodsList[index];
      if (
        this.editedFood.name.trim() === '' ||
        this.editedFood.weight <= 0 ||
        this.editedFood.calories < 0
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

// todo - at the moment when we edit the food it should be impossible to remove
the element
