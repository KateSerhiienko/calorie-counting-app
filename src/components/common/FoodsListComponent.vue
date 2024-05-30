<template>
  <div class="foods-list-component-wrapper">
    <div
      v-for="(mealtime, index) in getMealtimeList"
      :key="index"
      class="glb-wrapper foods-list-wrapper"
    >
      <div
        class="header"
        @click="
          filteredFoods(mealtime).length > 0
            ? toggleClosedSectionFoodsList(index)
            : null
        "
      >
        <h2>
          {{ mealtime }}
        </h2>
        <div
          class="overview"
          v-show="filteredFoods(mealtime).length > 0"
        >
          <p>
            {{ caloriesSumByMealtime[mealtime].toFixed() }} <span>kcal</span>
          </p>
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
        class="foods-list"
        :class="{
          visible:
            !getClosedSectionsFoodsList[index] &&
            filteredFoods(mealtime).length > 0,
        }"
      >
        <li
          class="list-item"
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
            <p class="food-kcal">
              {{ ((food.kcalPer100g / 100) * food.weight).toFixed() }}
              kcal
            </p>
          </div>
          <popup-component
            @close="openedPopupId = 0"
            :visible="openedPopupId === food.id"
          >
            <ul class="glb-popup">
              <li @click="editFood(food.id)">
                <svg :viewBox="svg['edit'].viewBox">
                  <path :d="svg['edit'].path" />
                </svg>
                <p>Edit food</p>
              </li>
              <li @click="deleteFood(food.id)">
                <svg :viewBox="svg['remove'].viewBox">
                  <path :d="svg['remove'].path" />
                </svg>
                <p>Remove food</p>
              </li>
            </ul>
          </popup-component>
        </li>
      </ul>
    </div>
    <p
      v-show="getFoodsList.length <= 0"
      class="glb-warning"
    >
      It seems like the food list is currently empty. To add a new food, click
      on the "+" button or "Add food" in the menu
    </p>
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
  .foods-list-component-wrapper {
    .foods-list-wrapper {
      margin: 6px 0;

      ul {
        padding-left: calc($container-padding / 2);
        border-left: 2px solid;
      }

      &:nth-child(1) {
        @include custom-background($secondary-color-lavender);
        ul {
          border-left-color: $secondary-color-lavender;
        }
      }
      &:nth-child(2) {
        @include custom-background($secondary-color-beige);
        ul {
          border-left-color: $secondary-color-beige;
        }
      }
      &:nth-child(3) {
        @include custom-background($secondary-color-blue);
        ul {
          border-left-color: $secondary-color-blue;
        }
      }
      &:nth-child(4) {
        @include custom-background($secondary-color-pink);
        ul {
          border-left-color: $secondary-color-pink;
        }
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
      justify-content: end;
    }

    .arrow {
      width: 14px;
      margin-left: $container-padding;
      fill: $primary-text-color;
      cursor: pointer;
      transition: $transition;

      &.up {
        transform: rotate(180deg);
      }
    }

    .foods-list {
      display: none;
      margin-top: $container-padding;

      &.visible {
        display: block;
      }
    }

    .list-item {
      margin-left: calc($container-padding / 2);

      &:not(:last-child) {
        padding-bottom: calc($container-padding / 2);
        margin-bottom: calc($container-padding / 2);
        border-bottom: 1px solid rgba($secondary-bg-color, 0.5);
      }
    }

    li.list-item {
      cursor: pointer;

      &:hover {
        .food {
          h3,
          p {
            color: $primary-hover-color;
          }
        }
      }
    }

    .food {
      display: flex;
      align-items: center;
      justify-content: space-between;

      div {
        width: calc(100% - 70px); // - min-width .food-kcal

        p {
          @include secondary-text(10px);

          transition: $transition;
        }
      }

      h3 {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: $transition;
      }

      .food-kcal {
        min-width: 70px;
        font-size: 12px;
        text-align: right;

        transition: $transition;
      }
    }
  }

  @include respond-to(desktop) {
    .foods-list-component-wrapper {
      flex-grow: 1;
      margin-right: $container-padding;
    }
  }
</style>
