<template>
  <div
    v-for="(mealtime, index) in getMealtimeList"
    :key="index"
    class="foods-list-component"
  >
    <div @click="toggleSection(index, mealtime)">
      <h2>
        {{ mealtime }}
      </h2>
      <div v-show="filteredFoods(mealtime).length > 0">
        <p>{{ caloriesSumByMealtime[mealtime].toFixed() }} kcal</p>
        <svg
          class="arrow"
          :class="getClosedSectionsFoodsList[index] ? '' : 'up'"
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
      >
        <div @click="openPopup(food.id)">
          <h3>{{ food.name }}</h3>
          <p>{{ food.weight }} g</p>
          <p>
            {{ ((food.kcalPer100g / 100) * food.weight).toFixed() }}
            kcal
          </p>
        </div>
        <popup-component
          @close="openedPopupId = 0"
          :visible="openedPopupId === food.id"
        >
          <p @click="removeFood(food.id)">Remove food</p>
          <router-link :to="'/edit_food/' + food.id">
            <p>Edit food</p>
          </router-link>
        </popup-component>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';
  import PopupComponent from './PopupComponent.vue';

  export default {
    name: 'FoodsListComponent',
    components: { PopupComponent },
    data() {
      return {
        openedPopupId: 0,
      };
    },
    computed: {
      ...mapGetters([
        'getMealtimeList',
        'getFoodsList',
        'getClosedSectionsFoodsList',
      ]),
      svg() {
        return svgJSON;
      },
      caloriesSumByMealtime() {
        const caloriesSum = {};
        this.getMealtimeList.forEach((mealtime) => {
          const foods = this.filteredFoods(mealtime);
          const sum = foods.reduce((total, food) => {
            return total + (food.kcalPer100g / 100) * food.weight;
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
      editFood(id) {
        console.log(id);
      },
      removeFood(id) {
        this.$store.commit('deleteFood', id);
      },
      openPopup(id) {
        this.openedPopupId = id;
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
  }
</style>
