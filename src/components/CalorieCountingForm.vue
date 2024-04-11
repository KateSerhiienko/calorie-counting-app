<template>
  <h4>Calorie counting form</h4>

  <form @submit.prevent="submitForm">
    <h5>
      Total Daily Energy Expenditure (TDEE) Calculation (Harris-Benedict
      equation)
    </h5>
    <div>
      <label>Sex at birth:</label>
      <div>
        <label for="female">
          <input
            type="radio"
            id="female"
            v-model="formData.sex"
            value="female"
            required
          />
          Female
        </label>
      </div>
      <div>
        <label for="male">
          <input
            type="radio"
            id="male"
            v-model="formData.sex"
            value="male"
            required
          />
          Male
        </label>
      </div>
    </div>
    <div>
      <label for="weight">Weight in kg:</label>
      <input type="number" id="weight" v-model="formData.weight" required />
    </div>
    <div>
      <label for="height">Height in cm:</label>
      <input type="number" id="height" v-model="formData.height" required />
    </div>
    <div>
      <label for="age">Age in years:</label>
      <input type="number" id="age" v-model="formData.age" required />
    </div>
    <div>
      <label for="activity">Choose your activity level:</label>
      <input
        type="range"
        id="activity"
        v-model="formData.selectedActivity"
        min="1.2"
        max="1.9"
        step="0.175"
      />
      <div v-for="activity in getActivityLevels" :key="activity.value">
        <div v-if="formData.selectedActivity === activity.value">
          <span>{{ activity.label }}</span>
          <p>{{ activity.explanation }}</p>
        </div>
      </div>
    </div>

    <button type="submit">Calculate equilibrium calorie content</button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CalorieCountingForm',
  data() {
    return {
      formData: {
        sex: '',
        weight: '',
        height: '',
        age: '',
        selectedActivity: '1.55',
      },
    };
  },
  computed: {
    ...mapGetters(['getActivityLevels']),
  },
  methods: {
    submitForm() {
      const { weight, height, age, sex, selectedActivity } = this.formData;

      const baseMetabolicRate =
        sex === 'male'
          ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
          : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

      const activityMultiplier = parseFloat(selectedActivity);
      const totalDailyEnergyExpenditure =
        baseMetabolicRate * activityMultiplier;

      const payload = {
        userData: { sex, weight, height, age, selectedActivity },
        totalDailyEnergyExpenditure,
      };

      this.$store.commit('setCalorieAndUserData', payload);
      this.$emit('form-submitted');
    },
  },
  emits: ['form-submitted'],
};
</script>

<style scoped>
form {
  max-width: 450px;
}
</style>
