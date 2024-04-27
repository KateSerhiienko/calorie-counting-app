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
>
  .form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .parametrs {
  }

  .parametrs-sex {
    display: flex;
    /* justify-content: center; */
    margin-bottom: 10px;

    div {
      margin-right: 30px;
    }
  }

  .parametrs-common {
    display: flex;
    justify-content: space-between;

    .weight {
      &::after {
        content: 'kg';
        position: absolute;
        transform: translate(-41px, 13px);
        color: $primary-color-light;
        font-size: 11px;
      }
    }

    .height {
      &::after {
        content: 'cm';
        position: absolute;
        transform: translate(-43px, 13px);
        color: $primary-color-light;
        font-size: 11px;
      }
    }

    .age {
      &::after {
        content: 'years';
        position: absolute;
        transform: translate(-57px, 13px);
        color: $primary-color-light;
        font-size: 11px;
      }
    }
  }

  .activity-header {
    margin-bottom: 10px;
  }

  .activity-explanation {
    line-height: 1;
    margin-bottom: 14px;
    opacity: 0;
    transition: $transition;
    position: absolute;
    width: 310px;

    .activity-titile {
      font-weight: bold;
      color: $primary-color;
    }

    .activity-text {
      color: $primary-color;
    }
  }

  .show {
    opacity: 1;
  }

  .activity-inputs {
    display: flex;
    margin-top: 58px;

    .activity-inputs-item {
      width: 60px;
      flex-direction: column;
      align-items: center;

      &:not(:last-child)::after {
        content: '';
        width: 40px;
        height: 2px;
        background: #98c5b6;
        transform: translate(25px, -31px);
      }
    }

    input {
      margin-bottom: 10px;
      z-index: 1;
    }

    label {
      font-size: 11px;
    }
  }

  .button {
    align-self: end;
  }
</style>
