import { createStore } from 'vuex';

const store = createStore({
  state: {
    totalCalories: null,
    mealtimeMap: [
      'breakfast',
      'brunch',
      'lunch',
      'snack',
      'dinner',
      'supper',
      'unnamed',
    ],
    foodsList: [
      {
        id: 111,
        mealtime: 'lunch',
        name: 'food-1',
        weight: 100,
        caloriesPer100g: 100.5,
      },
      {
        id: 222,
        mealtime: 'lunch',
        name: 'food-2',
        weight: 100,
        caloriesPer100g: 102.5,
      },
      {
        id: 333,
        mealtime: 'breakfast',
        name: 'food-3',
        weight: 30,
        caloriesPer100g: 300,
      },
    ]
  },
  mutations: {
    setTotalCalories(state, totalCalories) {
      state.totalCalories = totalCalories;
    },
    clearTotalCalories(state) {
      state.totalCalories = null;
    },
    addFood(state, newFood) {
      state.foodsList.push(newFood);
    },
    deleteFood(state, id) {
      state.foodsList = state.foodsList.filter(food => food.id !== id);
    },
    updateFood(state, updatedFood) {
      const index = state.foodsList.findIndex(food => food.id === updatedFood.id);
      if (index !== -1) {
        state.foodsList.splice(index, 1, updatedFood);
      }
    },
  },
  getters: {
    mealtimeMap: (state) => state.mealtimeMap,
    foodsList: (state) => state.foodsList,
    getTotalCalories: (state) => state.totalCalories
  }
});

export default store;
