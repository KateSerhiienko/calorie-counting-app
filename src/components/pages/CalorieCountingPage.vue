<template>
  <header class="glb-header">
    <h1>Total Daily Energy Expenditure (TDEE)</h1>
  </header>
  <main class="main">
    <div
      class="panel"
      :class="{ left: getCountingMode }"
    >
      <h2 class="panel-title">Calculation<br />Harris-Benedict equation</h2>
      <img
        class="panel-img"
        src="./../../assets/imgs/cc-img.png"
        alt="Calculation Harris-Benedict equation"
      />
    </div>
    <div class="content">
      <section class="content-item content-item-info">
        <calorie-counting-total />
      </section>
      <section class="content-item content-item-form">
        <calorie-counting-form />
      </section>
    </div>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CalorieCountingForm from '../CalorieCountingForm.vue';
  import CalorieCountingTotal from '../CalorieCountingTotal.vue';

  export default {
    name: 'CalorieCountingPage',
    components: { CalorieCountingForm, CalorieCountingTotal },
    computed: {
      ...mapGetters(['getCountingMode']),
    },
  };
</script>

<style
  scoped
  lang="scss"
></style>
