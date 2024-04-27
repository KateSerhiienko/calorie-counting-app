<template>
  <div class="wrapper">
    <header class="glb-header header">
      <foods-list-total />
    </header>
    <div class="food-input">
      <food-input />
    </div>
    <div class="food-list">
      <foods-list />
    </div>
  </div>
</template>

<script>
  import FoodInput from '../FoodInput.vue';
  import FoodsList from '../FoodsList.vue';
  import FoodsListTotal from '../FoodsListTotal.vue';

  export default {
    name: 'CalorieRecordingPage',
    components: {
      FoodInput,
      FoodsList,
      FoodsListTotal,
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    position: relative;
    height: 100%;
  }

  .header {
    padding: 20px;
  }

  .food-input {
    margin-top: -40px;
    margin-left: 5%;
    width: 40%;
    height: 70%;
  }

  .food-list {
    width: 50%;
    height: 600px;
    position: absolute;
    right: 0;
    top: 0;
  }
</style>
