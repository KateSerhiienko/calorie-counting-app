<template>
  <header class="glb-header">Total Daily Energy Expenditure (TDEE)</header>
  <calorie-counting-form
    v-if="countingMode"
    @form-submitted="setCountingMode(false)"
  />
  <div v-else>
    <calorie-counting-total />
    <button @click="setCountingMode(true)">Count the calories again</button>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import CalorieCountingForm from '../CalorieCountingForm.vue';
  import CalorieCountingTotal from '../CalorieCountingTotal.vue';

  export default {
    name: 'CalorieCountingPage',
    components: { CalorieCountingForm, CalorieCountingTotal },
    computed: {
      ...mapGetters(['getCountingMode', 'getCalorieAndUserData']),
      countingMode() {
        return this.getCountingMode;
      },
      calorieAndUserData() {
        return this.getCalorieAndUserData;
      },
    },
    methods: {
      ...mapMutations(['setCountingMode']),
    },
  };
</script>
