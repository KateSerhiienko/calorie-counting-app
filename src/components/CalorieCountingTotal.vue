<template>
  <div>
    <p>
      Total Calories:
      {{ getCalorieAndUserData.totalDailyEnergyExpenditure.toFixed(0) }}
    </p>
    <p>User Data:</p>
    <ul>
      <li>Sex: {{ getCalorieAndUserData.sex }}</li>
      <li>Weight: {{ getCalorieAndUserData.weight }}</li>
      <li>Height: {{ getCalorieAndUserData.height }}</li>
      <li>Age: {{ getCalorieAndUserData.age }}</li>
      <li>
        Activity Level:
        <span>
          {{ getCalorieAndUserData.activity }}
        </span>
      </li>
    </ul>
    <button
      type="button"
      class="glb-button"
      @click="setCountingMode(true)"
    >
      Count the calories again
    </button>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'CalorieCountingTotal',
    computed: {
      ...mapGetters(['getCalorieAndUserData']),
    },
    methods: {
      ...mapMutations(['setCountingMode']),
    },
  };
</script>
