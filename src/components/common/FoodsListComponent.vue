<template>
  <div
    v-for="(mealtime, index) in getMealtimeList"
    :key="index"
    class="foods-list-wrapper"
  >
    <div
      class="header"
      @click="toggleClosedSectionFoodsList(index)"
    >
      <h2>
        {{ mealtime }}
      </h2>
      <div
        class="overview"
        v-show="filteredFoods(mealtime).length > 0"
      >
        <p>{{ caloriesSumByMealtime[mealtime].toFixed() }} <span>kcal</span></p>
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
      :class="{
        visible:
          !getClosedSectionsFoodsList[index] &&
          filteredFoods(mealtime).length > 0,
      }"
    >
      <li
        v-for="food in filteredFoods(mealtime)"
        :key="food.id"
      >
        <div
          class="food"
          @click="openPopup(food.id)"
        >
          <div>
            <h3>{{ food.name }}</h3>
            <p>{{ food.weight }} g</p>
          </div>
          <p>
            {{ ((food.kcalPer100g / 100) * food.weight).toFixed() }}
            kcal
          </p>
        </div>
        <popup-component
          @close="openedPopupId = 0"
          :visible="openedPopupId === food.id"
        >
          <p @click="editFood(food.id)">Edit food</p>
          <p @click="deleteFood(food.id)">Remove food</p>
        </popup-component>
      </li>
    </ul>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import svgJSON from '../../assets/svg/svg.json';
  import PopupComponent from './PopupComponent.vue';

  export default {
    name: 'FoodsListComponent',
    components: { PopupComponent },
    data() {
      return {
        openedPopupId: -1,
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
      ...mapMutations([
        'setIdEditingFood',
        'deleteFood',
        'setModalOpened',
        'toggleClosedSectionFoodsList',
      ]),
      filteredFoods(mealtime) {
        return this.getFoodsList.filter((food) => food.mealtime === mealtime);
      },
      openPopup(id) {
        this.openedPopupId = id;
      },
      editFood(id) {
        this.setIdEditingFood(id);
        this.openedPopupId = -1;
        this.setModalOpened('edit-food');
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .foods-list-wrapper {
    border-radius: $border-radius;
    margin: 6px 0;
    padding: $container-padding;

    &:nth-child(2) {
      @include custom-background($secondary-color-lavender);
      ul {
        border-left: 2px solid $secondary-color-lavender;
      }
    }
    &:nth-child(3) {
      @include custom-background($secondary-color-beige);
      ul {
        border-left: 2px solid $secondary-color-beige;
      }
    }
    &:nth-child(4) {
      @include custom-background($secondary-color-pink);
      ul {
        border-left: 2px solid $secondary-color-pink;
      }
    }
    &:nth-child(5) {
      @include custom-background($secondary-color-blue);
      ul {
        border-left: 2px solid $secondary-color-blue;
      }
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: bold;
      }

      span {
        font-size: 10px;
      }
    }

    h2 {
      font-size: 16px;
      text-transform: capitalize;
    }

    .overview {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .arrow {
      width: 14px;
      margin-left: $container-padding;

      &.up {
        transform: rotate(180deg);
      }
    }

    ul {
      display: none;
      margin-top: $container-padding;

      &.visible {
        display: block;
      }
    }

    li {
      margin-left: $container-padding / 2;

      &:not(:last-child) {
        padding-bottom: $container-padding / 2;
        margin-bottom: $container-padding / 2;
        border-bottom: 1px solid rgba($secondary-bg-color, 0.5);
      }
    }

    .food {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        p {
          font-size: 10px;
          color: $secondary-text-color;
        }
      }

      h3 {
        font-size: 12px;
      }

      p {
        font-size: 12px;
      }
    }
  }
</style>
