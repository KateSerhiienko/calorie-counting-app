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
>
  .edit-wrapper {
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    position: relative;
    z-index: 4;
  }

  .edit-wrapper-bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .edit-item {
    display: flex;
    align-items: center;
    align-self: normal;
    margin-bottom: 10px;
    line-height: 1;
  }

  .textarea {
    width: 100%;
    height: 60px;
    padding: 10px 14px;
    resize: none;
  }

  .input {
    width: 62px;
    margin-right: 4px;
  }

  .edit-background {
    width: 100vw;
    height: 100vh;
    background: $background-color-light;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;

    &.visible {
      opacity: 0.8;
      transition: $transition;
      animation: fadeIn $transition;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 0.8;
      }
    }
  }
</style>
