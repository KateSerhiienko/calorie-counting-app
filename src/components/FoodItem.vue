<template>
  <div>
    <div>
      <span>{{ food.name }}</span>
      <div v-if="food.weight">
        <span>{{ food.weight.toFixed(0) }} grams</span>
        <span>{{ countedCalories.toFixed(0) }} kcal</span>
      </div>
      <span v-else>{{ food.caloriesPer100g.toFixed(0) }} kcal / 100g</span>
    </div>
    <div>
      <button type="button" @click="isEditing = true">Edit</button>
      <button type="button" @click="clearSelectedFood">Remove</button>
    </div>
  </div>
  <div v-show="isEditing">
    <food-edit :food="food" @save-edited-food="saveEditedFood"></food-edit>
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
  },
  components: {
    FoodEdit,
  },
  data() {
    return {
      isEditing: false,
    };
  },
  computed: {
    countedCalories() {
      if (this.food.caloriesPer100g && this.food.weight) {
        return (
          (this.food.caloriesPer100g.toFixed(0) / 100) *
          this.food.weight.toFixed(0)
        );
      }
    },
  },
  methods: {
    saveEditedFood(food) {
      this.isEditing = false;
      this.$emit('save-edited-food', food);
    },
    clearSelectedFood() {
      this.$emit('remove-food', this.food.id);
    },
  },
  emits: ['remove-food', 'save-edited-food'],
};
</script>
