<template>
  <div>
    <span>{{ food.name }}</span>
    <span>{{ food.weight.toFixed(0) }} grams</span>
    <span>{{ countedCalories[food.id].toFixed(0) }} kcal</span>
    <button type="button" @click="removeFood(food.id)">Remove</button>
    <button type="button" @click="editFood(food.id)">Edit</button>
  </div>
</template>

<script>
export default {
  name: 'FoodsListItem',
  props: {
    food: {
      type: Object,
      required: true,
    },
    countedCalories: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeFood() {
      this.$emit('remove', this.food.id);
    },
    editFood() {
      this.$emit('edit', this.food.id);
    },
  },
  emits: ['remove', 'edit'],
};
</script>

<style scoped>
span {
  margin-right: 10px;
}
</style>
