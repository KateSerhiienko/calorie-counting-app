import { createStore } from 'vuex';

const store = createStore({
  state: {
    nav: [
      {
        to: '/',
        title: 'Greetin',
      },
      {
        to: '/calorie_counting',
        title: 'Calorie counting',
      },
      {
        to: '/calorie_recording',
        title: 'Calorie recording',
      },
    ],
    media: [
      {
        href: 'mailto:kate.serhiienko@gmail.com',
        title: 'E-mail',
      },
      {
        href: 'https://github.com/KateSerhiienko',
        title: 'GitHub',
      },
      {
        href: 'https://www.linkedin.com/in/kateserhiienko',
        title: 'LinkedIn',
      },
      {
        href: 'https://www.artstation.com/katerynaserhiienko3',
        title: 'ArtStation',
      },
    ],
    countingMode: true,
    calorieAndUserData: {
      "sex": "female",
      "weight": 0,
      "height": 0,
      "age": 0,
      "activity": "1.55",
      "totalDailyEnergyExpenditure": 0
    },
    activityLevels: [
      {
        label: 'Sedentary lifestyle',
        value: '1.2',
        explanation: 'little or no physical activity',
      },
      {
        label: 'Lightly active',
        value: '1.375',
        explanation: 'exercise 1-3 times a week',
      },
      {
        label: 'Moderately active',
        value: '1.55',
        explanation: 'exercise 3-5 times a week',
      },
      {
        label: 'Very active',
        value: '1.725',
        explanation: 'exercise 6-7 times a week',
      },
      {
        label: 'Extremely active',
        value: '1.9',
        explanation: 'heavy exercise or physical work every day',
      },
    ],
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
    ],
  },
  mutations: {
    setCountingMode(state, newValue) {
      state.countingMode = newValue;
    },
    setCalorieAndUserData(state, formCalorieAndUserData) {
      state.calorieAndUserData = {
        ...formCalorieAndUserData.userData,
        totalDailyEnergyExpenditure: formCalorieAndUserData.totalDailyEnergyExpenditure,
      };
    },
    clearCalorieAndUserData(state) {
      state.calorieAndUserData = null;
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
    getNav: (state) => state.nav,
    getMedia: (state) => state.media,
    getCountingMode: (state) => state.countingMode,
    getActivityLevels: (state) => state.activityLevels,
    getCalorieAndUserData: (state) => state.calorieAndUserData,
    getMealtimeMap: (state) => state.mealtimeMap,
    getFoodsList: (state) => state.foodsList,
  },
});

export default store;
