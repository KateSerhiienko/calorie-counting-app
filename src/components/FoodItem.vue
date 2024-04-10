<!-- FoodItem.vue -->
<template>
  <div>
    <span>{{ food.name }}</span>
    <span>{{ food.weight.toFixed(0) }} grams</span>
    <span>{{ countedCalories[food.id].toFixed(0) }} kcal</span>
    <button type="button" @click="removeFood">Remove</button>
    <button type="button" @click="editFood">Edit</button>
    <food-edit
      v-if="food.id === editId"
      :food="food"
      :editId="editId"
      :editedFood="editedFood"
      @save-edited-food="saveEditedFood"
    ></food-edit>
  </div>
</template>

<script>
import FoodEdit from './FoodEdit.vue';

export default {
  name: 'FoodItem',
  props: {
    food: {
      type: Object,
      required: true,
    },
    countedCalories: {
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
  components: {
    FoodEdit,
  },
  methods: {
    removeFood() {
      this.$emit('remove', this.food.id);
    },
    editFood() {
      this.$emit('edit', this.food.id);
    },
    saveEditedFood() {
      this.$emit('save-edited-food', this.food.id);
    },
  },
  emits: ['remove', 'edit', 'save-edited-food'],
};
</script>
