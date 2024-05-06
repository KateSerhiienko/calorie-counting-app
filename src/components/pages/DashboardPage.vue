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
    name: 'DashboardPage',
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
></style>
