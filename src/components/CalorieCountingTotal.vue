<template>
  <h4>Calorie Counting Total</h4>
  <div v-if="calorieAndUserData !== null">
    <p>
      Total Calories:
      {{ calorieAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}
    </p>
    <p>User Data:</p>
    <ul>
      <li>Sex: {{ calorieAndUserData.userData.sex }}</li>
      <li>Weight: {{ calorieAndUserData.userData.weight }}</li>
      <li>Height: {{ calorieAndUserData.userData.height }}</li>
      <li>Age: {{ calorieAndUserData.userData.age }}</li>
      <li>
        Activity Level:
        <span>
          {{ getActivityLabel(calorieAndUserData.userData.selectedActivity) }}
        </span>
      </li>
    </ul>
    <button
      type="button"
      @click="countAgain"
    >
      Count the calories again
    </button>
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
          (level) => level.value === value
        );
        return activity ? activity.label : '';
      },
      countAgain() {
        this.$emit('count-again');
      },
    },
    emits: ['count-again'],
  };
</script>
