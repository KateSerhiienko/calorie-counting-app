import { createStore } from 'vuex';

const store = createStore({
  state: {
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
      },]
  },
  mutations: {
    updateFoodsList(state, newList) {
      state.foodsList = newList;
    },
  },
  actions: {
    setFoodsList({ commit }, newList) {
      commit('updateFoodsList', newList);
    },
  },
  getters: {
    mealtimeMap: (state) => state.mealtimeMap,
    foodsList: (state) => state.foodsList,
  }
});

export default store;
