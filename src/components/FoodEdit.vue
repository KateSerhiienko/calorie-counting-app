<template>
  <div class="edit-wrapper">
    <div class="edit-item">
      <textarea
        class="glb-input textarea"
        type="string"
        v-model="editedFood.name"
      />
    </div>
    <div class="edit-wrapper-bottom">
      <div
        class="edit-item"
        v-if="editedFood.weight"
      >
        <input
          class="glb-input input"
          type="number"
          v-model="editedFood.weight"
          min="1"
          placeholder="weight"
        />
        <span>g</span>
      </div>
      <div class="edit-item">
        <input
          class="glb-input input"
          type="number"
          v-model="editedFood.caloriesPer100g"
          min="0"
        />
        <span>kcal<br />per 100g</span>
      </div>
      <button
        class="glb-button"
        type="button"
        @click="saveEditedFood()"
      >
        Save
      </button>
    </div>
  </div>
  <div
    class="edit-background"
    :class="{ visible: Object.keys(editedFood).length > 0 }"
  ></div>
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

<style
  scoped
  lang="scss"
></style>
