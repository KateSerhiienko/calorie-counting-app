<template>
  <div>
    <p>Name:</p>
    <input type="string" v-model="editedFood.name" />
    <div v-if="editedFood.weight">
      <p>Weight:</p>
      <input type="number" v-model="editedFood.weight" min="1" />
    </div>
    <p>Calorie per 100g:</p>
    <input type="number" v-model="editedFood.caloriesPer100g" min="0" />
    <button type="button" @click="saveEditedFood()">Save</button>
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
  },
  computed: {
    editedFood() {
      return { ...this.food };
    },
  },
  methods: {
    saveEditedFood() {
      this.$emit('save-edited-food', this.editedFood);
    },
  },
  emits: ['save-edited-food'],
};
</script>
