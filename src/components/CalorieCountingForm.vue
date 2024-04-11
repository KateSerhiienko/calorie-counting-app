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
      <div v-for="activity in activityLevels" :key="activity.value">
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
          explanation:
            'Very high activity (heavy exercise or physical work every day)',
        },
      ],
    };
  },
  methods: {
    submitForm() {
      let totalDailyEnergyExpenditure;
      let baseMetabolicRate;
      const { weight, height, age, sex, selectedActivity } = this.formData;

      if (sex === 'male') {
        baseMetabolicRate =
          88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      } else {
        baseMetabolicRate =
          447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
      }

      const activityMultiplier = parseFloat(selectedActivity);

      totalDailyEnergyExpenditure = baseMetabolicRate * activityMultiplier;

      console.log(totalDailyEnergyExpenditure, sex);
    },
  },
};
</script>

<style scoped>
form {
  max-width: 450px;
}
</style>
