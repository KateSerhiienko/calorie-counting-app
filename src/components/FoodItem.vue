<template>
  <div
    class="food-wrapper"
    :class="{ short: !food.weight }"
  >
    <div class="food-content">
      <div class="food-text">
        <span
          class="food-title"
          :title="food.name"
          >{{ food.name }}</span
        >
        <div
          class="food-value"
          v-if="food.weight"
        >
          <span class="food-weight">{{ food.weight.toFixed(0) }}g</span>
          <span class="food-counted-calories">
            {{ countedCalories.toFixed(0) }} kcal
          </span>
        </div>
        <div
          class="food-value"
          v-else
        >
          <span class="food-calories">
            {{ food.caloriesPer100g.toFixed(0) }} kcal per 100g
          </span>
        </div>
      </div>
      <div class="buttons-wrapper">
        <div
          class="button-wrapper"
          title="edit food"
          @click="isEditing = true"
        >
          <!-- <svg
            class="button-edit"
            :viewBox="svg['edit'].viewBox"
          >
            <path :d="svg['edit'].path" />
          </svg> -->
        </div>
        <div
          class="button-wrapper"
          title="remove food"
          @click="clearSelectedFood"
        >
          <svg
            class="button-remove"
            :viewBox="svg['remove'].viewBox"
          >
            <path :d="svg['remove'].path" />
          </svg>
        </div>
      </div>
    </div>
    <div v-show="isEditing">
      <food-edit
        :food="food"
        @save-edited-food="saveEditedFood"
      ></food-edit>
    </div>
  </div>
</template>

<script>
  import FoodEdit from './FoodEdit.vue';
  import svgJSON from '../assets/svg/svg.json';

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
        if (
          this.food.caloriesPer100g !== undefined &&
          this.food.weight !== undefined
        ) {
          return (this.food.caloriesPer100g / 100) * this.food.weight;
        }
        return 0;
      },
      svg() {
        return svgJSON;
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

<style
  scoped
  lang="scss"
></style>
