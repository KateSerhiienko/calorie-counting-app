<template>
  <div class="statistic-container-wrapper">
    <div
      v-if="getUserData.totalDailyEnergyExpenditure"
      class="glb-wrapper statistic-wrapper data"
    >
      <div class="chart">
        <chart-component
          :data-dasharray="{
            value: totalCountedCalories,
            total: getUserData.totalDailyEnergyExpenditure,
          }"
          :radius="18"
        ></chart-component>
      </div>
      <div class="data-item">
        <h3>{{ getUserData.totalDailyEnergyExpenditure.toFixed(0) }}</h3>
        <p>kcal Total</p>
      </div>
      <div class="data-item">
        <h2>{{ totalCountedCalories.toFixed(0) }}</h2>
        <p>kcal Used</p>
      </div>
      <div
        class="data-item"
        :class="{ overflow: isCaloriesoverflow }"
      >
        <h3>{{ Math.abs(caloriesDifference.toFixed(0)) }}</h3>
        <p>kcal {{ !isCaloriesoverflow ? 'Left' : 'Over' }}</p>
      </div>
    </div>

    <div
      v-else
      class="glb-wrapper statistic-wrapper no-data"
    >
      <div class="placeholder">
        <p>
          For more detailed visual information, we advise you to calculate your
          daily calorie allowance:
        </p>
        <button
          class="glb-btn"
          type="button"
          @click="setModalOpened('edit-profile')"
        >
          Calculate
        </button>
      </div>
      <div class="total">
        <h2 class="total-title">Total used:</h2>
        <div>
          <p>{{ totalCountedCalories.toFixed(0) }} <span>kcal</span></p>
          <p>{{ totalCountedWeight.toFixed(0) }} <span>g</span></p>
        </div>
      </div>
    </div>

    <div
      v-if="getIsTablet || getIsDesktop"
      class="glb-wrapper"
    >
      <nav-component :view="'add-only'"></nav-component>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import ChartComponent from '../common/ChartComponent.vue';
  import NavComponent from '../common/NavComponent.vue';

  export default {
    name: 'StatisticComponent',
    components: {
      ChartComponent,
      NavComponent,
    },
    computed: {
      ...mapGetters([
        'getFoodsList',
        'getUserData',
        'getIsTablet',
        'getIsDesktop',
      ]),
      totalCountedWeight() {
        return this.getFoodsList.reduce(
          (total, food) => total + +food.weight,
          0
        );
      },
      totalCountedCalories() {
        return this.getFoodsList.reduce(
          (total, food) => total + (food.kcalPer100g / 100) * food.weight,
          0
        );
      },
      caloriesDifference() {
        return (
          this.getUserData.totalDailyEnergyExpenditure -
          this.totalCountedCalories
        );
      },
      isCaloriesoverflow() {
        return this.caloriesDifference < 0;
      },
    },
    methods: {
      ...mapMutations(['setModalOpened']),
    },
  };
</script>

<style
  lang="scss"
  scoped
>
  .statistic-container-wrapper {
    margin-bottom: $container-padding;

    .statistic-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      height: calc(
        128px + $container-padding * 2
      ); // height .chart + .glb-wrapper top and bottom paddings

      &.data {
        .chart {
          position: absolute;
          width: calc(100% - $container-padding);
          height: 128px;
        }

        .data-item {
          text-align: center;
          min-width: 30%;
        }

        h2 {
          font-size: 20px;
        }

        h3 {
          font-size: 16px;
        }

        p {
          @include secondary-text(10px);
        }

        .overflow {
          color: $secondary-color-pink;
        }
      }

      &.no-data {
        .placeholder,
        .total {
          width: 44%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .placeholder {
          p {
            font-size: 10px;
            margin-bottom: $container-padding;
          }
        }

        .total {
          h2 {
            font-size: 20px;
            margin-bottom: $container-padding;
          }

          div {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
          }

          p {
            font-size: 18px;
            font-weight: bold;
          }

          span {
            font-weight: normal;
            @include secondary-text(10px);
          }
        }
      }
    }
  }

  @include respond-to(tablet) {
    .statistic-container-wrapper {
      display: flex;

      .statistic-wrapper {
        flex-grow: 1;
        margin-right: $container-padding;
      }
    }
  }

  @include respond-to(desktop) {
    .statistic-container-wrapper {
      .statistic-wrapper {
        width: 320px;
        flex-direction: column;
        justify-content: space-around;
        margin-bottom: $container-padding;
        height: 400px;
        padding-top: calc($container-padding * 2);
        padding-bottom: calc($container-padding * 2);

        &.data .chart {
          width: 100%;
          height: 160px;
          top: calc(50% - (160px / 2));
        }
      }
    }
  }
</style>
