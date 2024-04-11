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
    foodsList: [],
  },
  getters: {
    mealtimeMap: (state) => state.mealtimeMap,
  }
});

export default store;
