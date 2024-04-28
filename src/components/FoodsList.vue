<template>
  <div class="wrapper">
    <div
      v-for="(mealtime, index) in getMealtimeMap"
      :key="index"
    >
      <div v-if="filteredFoods(mealtime).length > 0">
        <div
          class="mealtime-header"
          :class="`mealtime-${index}`"
          @click="toggleSection(index)"
        >
          <h4 class="mealtime-title">
            {{ mealtime }}
          </h4>
          <i
            class="arrow"
            :class="closedSections[index] ? 'arrow-down' : 'arrow-up'"
          ></i>
        </div>
        <ul
          :class="{ visible: !getClosedSectionsFoodsList[index] }"
          class="food-list"
        >
          <li
            v-for="(food, foodIndex) in filteredFoods(mealtime)"
            :key="foodIndex"
          >
            <food-item
              :food="food"
              @save-edited-food="saveEditedFood"
              @remove-food="removeFood"
            ></food-item>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FoodItem from './FoodItem.vue';

  export default {
    name: 'FoodsList',
    components: {
      FoodItem,
    },
    data() {
      return {
        closedSections: {},
      };
    },
    computed: {
      ...mapGetters([
        'getMealtimeMap',
        'getFoodsList',
        'getClosedSectionsFoodsList',
      ]),
    },
    methods: {
      filteredFoods(mealtime) {
        return this.getFoodsList.filter((food) => food.mealtime === mealtime);
      },
      toggleSection(index) {
        this.$store.commit('toggleClosedSectionFoodsList', index);
      },
      saveEditedFood(food) {
        this.$store.commit('updateFood', food);
        // todo - alert "food saved"
      },
      removeFood(id) {
        this.$store.commit('deleteFood', id);
        // todo - alert "food removed"
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    padding: 20px 0;
    background: $background-color-light;
    border-radius: $border-radius;
    padding-bottom: 43px;
    box-shadow: $box-shadow;
    overflow: scroll;
  }

  .mealtime-header {
    padding: 4px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .mealtime-0 {
    background: $primary-color;
  }
  .mealtime-1 {
    background: $gradient-color-1;
  }
  .mealtime-2 {
    background: $gradient-color-2;
  }
  .mealtime-3 {
    background: $gradient-color-3;
  }
  .mealtime-4 {
    background: $gradient-color-4;
  }
  .mealtime-5 {
    background: $gradient-color-5;
  }
  .mealtime-6 {
    background: $secondary-color;
  }

  .mealtime-title {
    color: $background-color-light;
    text-transform: capitalize;
  }

  .arrow {
    border: solid $background-color-light;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 4px;
    transition: $transition;

    &-up {
      transform: rotate(-135deg);
      -webkit-transform: rotate(-135deg);
    }

    &-down {
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }

  .food-list {
    opacity: 0;
    max-height: 0;
    transition: $transition;
  }

  .visible {
    opacity: 1;
    max-height: 100%;
  }
</style>
