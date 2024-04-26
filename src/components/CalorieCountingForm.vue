<template>
  <form
    @submit.prevent="submitForm"
    class="form"
  >
    <h3>Body Parametrs</h3>
    <div class="sex">
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
    <div class="parametrs">
      <div>
        <input
          type="number"
          id="weight"
          placeholder="weight | kg"
          v-model="formData.weight"
          required
          class="glb-input"
          min="0"
        />
      </div>
      <div>
        <input
          type="number"
          id="height"
          placeholder="height | kg"
          v-model="formData.height"
          required
          class="glb-input"
          min="0"
        />
      </div>
      <div>
        <input
          type="number"
          id="age"
          placeholder="age | years"
          v-model="formData.age"
          required
          class="glb-input"
          min="0"
        />
      </div>
    </div>
    <div class="activity">
      <p>Activity Level</p>
      <div
        v-for="activity in getActivityLevels"
        :key="activity.value"
      >
        <div v-if="formData.selectedActivity === activity.value">
          <span>{{ activity.label }}: </span>
          <span>{{ activity.explanation }}</span>
        </div>
      </div>
      <div>
        <input
          type="range"
          id="activity"
          v-model="formData.selectedActivity"
          min="1.2"
          max="1.9"
          step="0.175"
        />
        <ul
          v-for="activity in getActivityLevels"
          :key="activity.value"
        >
          <li>{{ activity.label.split(' ')[0] }}</li>
        </ul>
      </div>
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
          sex: '',
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

        const formCalorieAndUserData = {
          userData: {
            sex,
            weight,
            height,
            age,
            activity: selectedActivityLabel,
          },
          totalDailyEnergyExpenditure,
        };

        this.$store.commit('setCalorieAndUserData', formCalorieAndUserData);
        this.$store.commit('setCountingMode', false);
      },
      clearForm() {
        this.formData = {
          sex: '',
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
>
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .sex {
    display: flex;

    div {
      margin-right: 20px;
    }
  }

  .parametrs {
    display: flex;
    justify-content: space-between;
  }

  .button {
    align-self: end;
  }
</style>
