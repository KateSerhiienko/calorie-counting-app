<template>
  <div
    v-for="(mealtime, index) in getMealtimeMap"
    :key="index"
    class="foods-list-component"
  >
    <div @click="toggleSection(index, mealtime)">
      <h2>
        {{ mealtime }}
      </h2>
      <p>{{ caloriesSumByMealtime[mealtime].toFixed() }} kcal</p>
      <div v-show="filteredFoods(mealtime).length > 0">
        <svg
          class="arrow"
          :class="getClosedSectionsFoodsList[index] ? 'up' : ''"
          :viewBox="svg['arrow'].viewBox"
        >
          <path :d="svg['arrow'].path" />
        </svg>
      </div>
    </div>
    <ul
      class="food-list"
      :class="{ visible: !getClosedSectionsFoodsList[index] }"
    >
      <li
        v-for="food in filteredFoods(mealtime)"
        :key="food.id"
        class="food-item"
        @click="showActions"
      >
        <h3>{{ food.name }}</h3>
        <p>{{ food.weight }} g</p>
        <p>
          {{ ((food.caloriesPer100g / 100) * food.weight).toFixed() }}
          kcal
        </p>
        <div class="actions">
          <svg
            :viewBox="svg['close-popup'].viewBox"
            @click="hideActions"
          >
            <path :d="svg['close-popup'].path" />
          </svg>
          <p @click="removeFood(food.id)">Remove food</p>
          <router-link :to="'/edit_food/' + food.id">
            <p>Edit food</p>
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';

  export default {
    name: 'FoodsListComponent',
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
      svg() {
        return svgJSON;
      },
      caloriesSumByMealtime() {
        const caloriesSum = {};
        this.getMealtimeMap.forEach((mealtime) => {
          const foods = this.filteredFoods(mealtime);
          const sum = foods.reduce((total, food) => {
            return total + (food.caloriesPer100g / 100) * food.weight;
          }, 0);
          caloriesSum[mealtime] = sum;
        });
        return caloriesSum;
      },
    },
    methods: {
      filteredFoods(mealtime) {
        return this.getFoodsList.filter((food) => food.mealtime === mealtime);
      },
      toggleSection(index, mealtime) {
        if (this.filteredFoods(mealtime).length > 0) {
          this.$store.commit('toggleClosedSectionFoodsList', index);
        }
      },
      showActions() {
        event.currentTarget.querySelector('.actions').style.display = 'block';
      },
      hideActions() {
        event.currentTarget.querySelector('.actions').style.display = 'none';
      },
      editFood(id) {
        console.log(id);
      },
      removeFood(id) {
        this.$store.commit('deleteFood', id);
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .foods-list-component {
    h2 {
      text-transform: capitalize;
    }

    .arrow {
      height: 20px;

      &.up {
        transform: rotate(180deg);
      }
    }

    ul {
      display: none;

      &.visible {
        display: block;
      }
    }

    .actions {
      display: none;
    }

    svg {
      width: 32px;
    }
  }
</style>
