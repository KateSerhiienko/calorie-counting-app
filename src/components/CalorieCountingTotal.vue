<template>
  <h4>Calorie Counting Total</h4>
  <div v-if="calorieAndUserData !== null">
    <p>
      Total Calories:
      {{ calorieAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}
    </p>
    <p>User Data:</p>
    <ul>
      <li>Sex: {{ calorieAndUserData.sex }}</li>
      <li>Weight: {{ calorieAndUserData.weight }}</li>
      <li>Height: {{ calorieAndUserData.height }}</li>
      <li>Age: {{ calorieAndUserData.age }}</li>
      <li>
        Activity Level:
        <span v-if="calorieAndUserData.selectedActivity">
          {{ getActivityLabel(calorieAndUserData.selectedActivity) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CalorieCountingTotal',
  computed: {
    ...mapGetters(['getCalorieAndUserData', 'getActivityLevels']),
    calorieAndUserData() {
      return this.getCalorieAndUserData;
    },
  },
  methods: {
    getActivityLabel(value) {
      const activity = this.getActivityLevels.find(
        (level) => level.value === value,
      );
      return activity ? activity.label : '';
    },
  },
};
</script>
