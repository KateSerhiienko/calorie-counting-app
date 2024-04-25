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
      "userData": {
        "sex": "female",
        "weight": 64,
        "height": 167,
        "age": 28,
        "selectedActivity": "1.55"
      },
      "totalDailyEnergyExpenditure": 1973
    },
    activityLevels: [
      {
        label: 'Sedentary',
        value: '1.2',
        explanation: 'Sedentary lifestyle (little or no physical activity)',
      },
      {
        label: 'Lightly Active',
        value: '1.375',
        explanation: 'Light activity (exercise 1-3 times a week)',
      },
      {
        label: 'Moderately Active',
        value: '1.55',
        explanation: 'Moderate activity (exercise 3-5 times a week)',
      },
      {
        label: 'Very Active',
        value: '1.725',
        explanation: 'High activity (exercise 6-7 times a week)',
      },
      {
        label: 'Extremely Active',
        value: '1.9',
        explanation: 'Very high activity (heavy exercise or physical work every day)',
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
    setCalorieAndUserData(state, payload) {
      state.calorieAndUserData = {
        ...payload.userData,
        totalDailyEnergyExpenditure: payload.totalDailyEnergyExpenditure,
      };
    },
    clearCalorieAndUserData(state) {
      return { ...state, calorieAndUserData: null };
    },
    addFood(state, newFood) {
      return { ...state, foodsList: [...state.foodsList, newFood] };
    },
    deleteFood(state, id) {
      return { ...state, foodsList: state.foodsList.filter((food) => food.id !== id) };
    },
    updateFood(state, updatedFood) {
      const index = state.foodsList.findIndex((food) => food.id === updatedFood.id);
      if (index !== -1) {
        return {
          ...state,
          foodsList: [
            ...state.foodsList.slice(0, index),
            updatedFood,
            ...state.foodsList.slice(index + 1),
          ],
        };
      }
      return state;
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
