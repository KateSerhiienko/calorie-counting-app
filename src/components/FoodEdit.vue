<template>
  <div>
    <p>Name:</p>
    <input type="string" v-model="editedFood.name" />
    <p>Weight:</p>
    <input type="number" v-model="editedFood.weight" min="1" />
    <p>Calorie per 100g:</p>
    <input type="number" v-model="editedFood.caloriesPer100g" min="0" />
    <button type="button" @click="saveEditedFood(food.id)">Save</button>
  </div>
</template>

<script>
export default {
  name: 'FoodEdit',
  props: {
    food: {
      type: Object,
      required: true,
    },
    editId: {
      type: Number,
      required: true,
    },
    editedFood: {
      type: Object,
      required: true,
    },
  },
  methods: {
    saveEditedFood() {
      this.$emit('save-edited-food');
    },
  },
  emits: ['save-edited-food'],
};
</script>
