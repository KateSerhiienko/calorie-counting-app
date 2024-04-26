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
        alt=">Calculation Harris-Benedict equation"
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
>
  .main {
    width: 90%;
    height: 70%;
    margin: -40px auto;
    background-color: $background-color-light;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }

  .panel {
    position: absolute;
    width: 42%;
    height: 70%;
    background-color: $secondary-color;
    border-radius: $border-radius;
    color: $background-color-light;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transform: translate(107%, 0);
    transition: $transition;

    &-title {
      margin-top: 60px;
      padding: 0 30px;
    }

    &-img {
      width: 220px;
      filter: drop-shadow($box-shadow);
    }
  }

  .left {
    transform: translate(0, 0);
  }

  .content {
    display: flex;
    height: 100%;

    &-item {
      flex: 50%;
      margin: 20px;
    }
  }
</style>
