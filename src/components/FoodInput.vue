<template>
  <div
    class="wrapper"
    :class="{ 'manual-mode': inputMode === 'manual' }"
  >
    <div
      class="mealtime"
      :class="{ 'manual-mode': inputMode === 'manual' }"
    >
      <h4>Mealtime</h4>
      <select
        v-model="mealtime"
        class="glb-input select"
        :class="{ 'manual-mode': inputMode === 'manual' }"
      >
        <option
          v-for="mealtimeName in getMealtimeMap"
          :key="mealtimeName"
        >
          {{ mealtimeName }}
        </option>
      </select>
    </div>

    <div class="search">
      <div v-show="inputMode === 'database'">
        <food-input-database
          ref="foodInputDatabase"
          @select-food-from-database="selectFoodFromDatabase"
        />
      </div>

      <div v-show="inputMode === 'manual'">
        <p>Name of the food</p>
        <input
          type="text"
          v-model="foodName"
        />
        <p>Calorie content per 100g</p>
        <input
          type="number"
          v-model="caloriesPer100g"
          min="0"
        />
      </div>
    </div>

    <div class="weight">
      <span class="weight-title">Amount of food:</span>
      <input
        class="glb-input"
        type="number"
        v-model="foodWeight"
        min="1"
      />
      <span class="weight-text">gramm</span>
    </div>

    <div class="button-wrapper">
      <button
        class="glb-button"
        type="button"
        @click="addFood"
      >
        add
      </button>
    </div>
  </div>

  <div class="mode">
    <button
      class="glb-button button-manually"
      :class="{ active: inputMode === 'manual' }"
      @click="switchInputMode('manual')"
    >
      manually
    </button>
    <button
      class="glb-button button-database"
      :class="{ active: inputMode === 'database' }"
      @click="switchInputMode('database')"
    >
      from data
    </button>
  </div>
</template>

<script>
  import { v4 as uuidv4 } from 'uuid';
  import { mapGetters } from 'vuex';
  import FoodInputDatabase from './FoodInputDatabase.vue';

  export default {
    name: 'FoodInput',
    components: {
      FoodInputDatabase,
    },
    data() {
      return {
        inputMode: 'database',
        mealtime: 'unnamed',
        foodName: '',
        caloriesPer100g: 0,
        foodWeight: 1,
      };
    },
    computed: {
      ...mapGetters(['getMealtimeMap']),
    },
    methods: {
      switchInputMode(mode) {
        this.inputMode = mode;
        this.resetInputFields();
      },
      selectFoodFromDatabase(food) {
        this.foodName = food.name;
        this.caloriesPer100g = food.caloriesPer100g;
      },
      addFood() {
        if (!this.validateInput()) {
          return;
        }

        const foodToAdd = {
          id: uuidv4(),
          mealtime: this.mealtime,
          name: this.foodName,
          weight: this.foodWeight,
          caloriesPer100g: this.caloriesPer100g,
        };

        this.$store.commit('addFood', foodToAdd);

        this.resetInputFields();
      },
      resetInputFields() {
        this.foodName = '';
        this.caloriesPer100g = 0;
        this.foodWeight = 1;

        this.$refs.foodInputDatabase.removeFood();
      },
      validateInput() {
        if (
          this.foodName.trim() === '' ||
          this.caloriesPer100g < 0 ||
          this.foodWeight <= 0
        ) {
          return false;
        }
        return true;
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    background: $background-color-light;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
    border: 2px solid $secondary-color;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 2;
    transition: $transition;
  }

  .mealtime {
    padding: 10px 20px 10px;
  }

  .search,
  .weight {
    padding: 10px 20px 0px;
  }

  .button-wrapper {
    padding: 5px 20px 10px;
  }

  .mealtime {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: $secondary-color;
    color: $background-color-light;
    transition: $transition;

    .select {
      width: 170px;
      border-color: $secondary-color-dark;
      color: $secondary-color-dark;
    }
  }

  .search {
    height: 220px;
  }

  .weight {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    color: $primary-color;

    &-title {
      font-weight: bold;
    }

    input {
      width: 70px;
    }

    &-text {
      font-size: 12px;
    }
  }

  .mode {
    position: absolute;
    /* transform: rotate(-90deg) translate(220px, -106px); */
    transform: rotate(-90deg) translate(220px, -98px);
    z-index: 1;

    button {
      height: 100px;
      padding-bottom: 84px;
      padding-top: 8px;
      background: $primary-color-light;
    }

    button.button-database {
      background: $secondary-color;

      &::before {
        background: $secondary-color-light;
        background-image: linear-gradient(
          45deg,
          $secondary-color 0%,
          $secondary-color-light 100%
        );
      }
    }
  }

  button.active {
    transform: translate(0, -6px);
    box-shadow: $box-shadow;
  }

  .wrapper.manual-mode {
    border-color: $primary-color-light;
  }

  .mealtime.manual-mode {
    background: $primary-color-light;
  }

  .select.manual-mode {
    border-color: $primary-color-dark;
    color: $primary-color-dark;
  }
</style>
