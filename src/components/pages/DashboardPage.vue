<template>
  <statistic-component />
  <foods-list-component />
</template>

<script>
  import FoodsListComponent from '../common/FoodsListComponent.vue';
  import StatisticComponent from '../common/StatisticComponent.vue';

  export default {
    name: 'DashboardPage',
    components: {
      FoodsListComponent,
      StatisticComponent,
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
