import { createStore } from 'vuex';

const store = createStore({
  state: {
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
    userData: {
      // "sex": "female",
      // "weight": 0,
      // "height": 0,
      // "age": 0,
      // "activity": "1.55",
      // "totalDailyEnergyExpenditure": 0
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
    mealtimeList: [
      'breakfast',
      'lunch',
      'dinner',
      'snack',
    ],
    foodsList: [
      {
        id: 111,
        mealtime: 'lunch',
        name: 'food-1',
        weight: 100,
        kcalPer100g: 100,
      },
      {
        idDatabase: 2121,
        id: 222,
        mealtime: 'lunch',
        name: 'food-2',
        weight: 100,
        kcalPer100g: 102,
      },
      {
        id: 333,
        mealtime: 'breakfast',
        name: 'food-3',
        weight: 30,
        kcalPer100g: 300,
      },
      {
        id: 444,
        mealtime: 'snack',
        name: 'food-444444444444444444444444444',
        weight: 40,
        kcalPer100g: 0,
      },
    ],
    closedSectionsFoodsList: {},
    modalOpened: '',
    mealtimeOfFood: 'breakfast',
    isAddFoodManually: false,
    idEditingFood: ''
  },
  mutations: {
    setUserData(state, newValue) {
      state.userData = newValue;
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
    toggleClosedSectionFoodsList(state, index) {
      state.closedSectionsFoodsList[index] = !state.closedSectionsFoodsList[index];
    },
    setModalOpened(state, newValue) {
      state.modalOpened = newValue;
    },
    setMealtimeOfFood(state, newValue) {
      state.mealtimeOfFood = newValue;
    },
    toggleIsAddFoodManually(state) {
      state.isAddFoodManually = !state.isAddFoodManually;
    },
    setIdEditingFood(state, newValue) {
      state.idEditingFood = newValue;
    },
  },
  getters: {
    getMedia: (state) => state.media,
    getActivityLevels: (state) => state.activityLevels,
    getUserData: (state) => state.userData,
    getMealtimeList: (state) => state.mealtimeList,
    getFoodsList: (state) => state.foodsList,
    getClosedSectionsFoodsList: (state) => state.closedSectionsFoodsList,
    getModalOpened: (state) => state.modalOpened,
    getMealtimeOfFood: (state) => state.mealtimeOfFood,
    getIsAddFoodManually: (state) => state.isAddFoodManually,
    getIdEditingFood: (state) => state.idEditingFood,
  },
});

export default store;
