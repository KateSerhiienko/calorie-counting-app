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
            :class="
              getClosedSectionsFoodsList[index] ? 'arrow-down' : 'arrow-up'
            "
          ></i>
        </div>
        <ul
          :class="{ visible: !getClosedSectionsFoodsList[index] }"
          class="food-list"
        >
          <li
            v-for="(food, foodIndex) in filteredFoods(mealtime)"
            :key="foodIndex"
            class="food-item"
            :class="{ visible: !getClosedSectionsFoodsList[index] }"
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

    <p
      v-show="Object.keys(getFoodsList).length === 0"
      class="empty-list"
    >
      The food list is still empty. You can fill it out using the form on the
      left.
    </p>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FoodItem from '../FoodItem.vue';

  export default {
    name: 'FoodsListComponent',
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
></style>
