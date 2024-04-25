<template>
  <header class="glb-header">Calorie Recording</header>
  <food-input></food-input>
  <foods-list></foods-list>
</template>

<script>
  import FoodInput from '../FoodInput.vue';
  import FoodsList from '../FoodsList.vue';

  export default {
    name: 'CalorieRecordingPage',
    components: {
      FoodInput,
      FoodsList,
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
