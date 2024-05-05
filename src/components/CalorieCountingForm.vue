<template>
  <form
    @submit.prevent="submitForm"
    class="form"
  >
    <h3>Body Parametrs</h3>
    <div class="parametrs">
      <div class="parametrs-sex">
        <div class="glb-radio">
          <input
            type="radio"
            id="female"
            v-model="formData.sex"
            value="female"
            required
          />
          <label for="female"> female </label>
        </div>
        <div class="glb-radio">
          <input
            type="radio"
            id="male"
            v-model="formData.sex"
            value="male"
            required
          />
          <label for="male"> male </label>
        </div>
      </div>
      <div class="parametrs-common">
        <div class="weight">
          <input
            type="number"
            id="weight"
            placeholder="weight"
            v-model="formData.weight"
            required
            class="glb-input"
            min="0"
            max="1000"
          />
        </div>
        <div class="height">
          <input
            type="number"
            id="height"
            placeholder="height"
            v-model="formData.height"
            required
            class="glb-input"
            min="0"
            max="1000"
          />
        </div>
        <div class="age">
          <input
            type="number"
            id="age"
            placeholder="age"
            v-model="formData.age"
            required
            class="glb-input"
            min="0"
            max="1000"
          />
        </div>
      </div>
    </div>
    <div class="activity">
      <h4 class="activity-header">Activity Level</h4>
      <div
        v-for="activity in getActivityLevels"
        :key="activity.value"
      >
        <div
          class="activity-explanation"
          :class="{ show: formData.selectedActivity === activity.value }"
        >
          <span class="activity-titile">{{ activity.label }}: </span>
          <span class="activity-text">{{ activity.explanation }}</span>
        </div>
      </div>
      <ul class="activity-inputs">
        <li
          v-for="activity in getActivityLevels"
          :key="activity.value"
          class="glb-radio activity-inputs-item"
        >
          <input
            type="radio"
            :id="activity.label.toLowerCase().split(' ')[0]"
            v-model="formData.selectedActivity"
            :value="activity.value"
            required
          />
          <label>{{ activity.label.split(' ')[0] }}</label>
        </li>
      </ul>
    </div>

    <button
      class="glb-button button"
      type="submit"
    >
      calculate
    </button>
  </form>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'CalorieCountingForm',
    data() {
      return {
        formData: {
          sex: 'female',
          weight: '',
          height: '',
          age: '',
          selectedActivity: '1.55',
        },
      };
    },
    computed: {
      ...mapGetters(['getActivityLevels', 'getCountingMode']),
    },
    watch: {
      getCountingMode(newValue) {
        if (newValue) {
          this.clearForm();
        }
      },
    },
    methods: {
      submitForm() {
        const { weight, height, age, sex, selectedActivity } = this.formData;

        const baseMetabolicRate =
          sex === 'male'
            ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
            : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

        const totalDailyEnergyExpenditure =
          baseMetabolicRate * selectedActivity;

        const selectedActivityLabel = this.getActivityLevels.find(
          (level) => level.value === selectedActivity
        ).label;

        const formcaloriesAndUserData = {
          userData: {
            sex,
            weight,
            height,
            age,
            activity: selectedActivityLabel,
          },
          totalDailyEnergyExpenditure,
        };

        this.$store.commit('setCaloriesAndUserData', formcaloriesAndUserData);
        this.$store.commit('setCountingMode', false);
      },
      clearForm() {
        this.formData = {
          sex: 'female',
          weight: '',
          height: '',
          age: '',
          selectedActivity: '1.55',
        };
      },
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
