<template>
  <div class="dashboard-wrapper">
    <statistic-component />
    <foods-list-component />
  </div>
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
>
  @include respond-to(desktop) {
    .dashboard-wrapper {
      display: flex;
      flex-direction: row-reverse;
    }
  }
</style>
