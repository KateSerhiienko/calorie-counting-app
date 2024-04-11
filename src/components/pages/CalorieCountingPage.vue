<template>
  <h3>Calorie Counting</h3>
  <calorie-counting-form v-if="countingMode" />
  <div v-else>
    <calorie-counting-total />
    <button @click="countingMode = !countingMode">
      count the calories again
    </button>
  </div>
</template>

<script>
import CalorieCountingForm from '../CalorieCountingForm.vue';
import CalorieCountingTotal from '../CalorieCountingTotal.vue';

export default {
  name: 'CalorieCountingPage',
  components: { CalorieCountingForm, CalorieCountingTotal },
  data() {
    return {
      countingMode: true,
    };
  },
};
</script>
