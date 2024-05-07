<template>
  <form
    class="wrapper"
    :class="{ 'manual-mode': inputMode === 'manual' }"
    @submit.prevent="addFood"
  >
    <div class="mealtime">
      <h4>Mealtime</h4>
      <ul
        v-for="mealtime in getMealtimeList"
        :key="mealtime"
      >
        <li @click="selectMealtime(mealtime)">
          {{ mealtime }}
        </li>
      </ul>
    </div>

    <div class="search">
      <header>
        <select
          v-model="mealtime"
          class="glb-input select"
          :class="{ 'manual-mode': inputMode === 'manual' }"
        >
          <option
            v-for="mealtime in getMealtimeList"
            :key="mealtime"
          >
            {{ mealtime }}
          </option>
        </select>
      </header>
      <div v-show="inputMode === 'database'">
        <food-input-database
          ref="foodInputDatabase"
          @select-food-from-database="selectFoodFromDatabase"
        />
      </div>

      <div
        class="manual"
        v-show="inputMode === 'manual'"
      >
        <div>
          <p class="manual-title">Name of the food:</p>
          <textarea
            class="glb-input textarea"
            v-model="foodName"
          ></textarea>
        </div>
        <div>
          <p class="manual-title">Calorie content per 100g:</p>
          <div class="manual-value">
            <input
              class="glb-input manual-input"
              type="number"
              v-model="caloriesPer100g"
              min="0"
            />
            <span>kcal</span>
          </div>
        </div>
      </div>
    </div>

    <div class="weight">
      <span class="weight-title">Amount of food:</span>
      <div>
        <input
          class="glb-input"
          type="number"
          v-model="foodWeight"
          min="1"
        />
        <span class="weight-text">gramm</span>
      </div>
    </div>

    <div class="button-wrapper">
      <button
        class="glb-button"
        :class="{ 'button-disabled': !foodName }"
        type="submit"
      >
        add
      </button>
    </div>
  </form>

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
        mealtime: '',
        foodName: '',
        caloriesPer100g: 0,
        foodWeight: 1,
      };
    },
    computed: {
      ...mapGetters(['getMealtimeList']),
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
      selectMealtime(mealtime) {
        this.mealtime = mealtime;
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
></style>
