<template>
  <header class="glb-header">Total Daily Energy Expenditure (TDEE)</header>
  <main class="main">
    <div class="panel">
      <p class="panel-title">Calculation<br />Harris-Benedict equation</p>
      <img
        class="panel-img"
        src="./../../assets/imgs/cc-img.png"
        alt=">Calculation Harris-Benedict equation"
      />
    </div>
    <div class="content">
      <div
        class="content-item content-item-right"
        v-show="getCountingMode"
      >
        <calorie-counting-form />
      </div>
      <div
        class="content-item content-item-left"
        v-show="!getCountingMode"
      >
        <calorie-counting-total />
      </div>
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
    width: 80%;
    height: 80%;
    margin: -50px auto;
    background-color: $background-color-light;
    border-radius: $border-radius;
    box-shadow: $box-shadow;
  }

  .panel {
    position: absolute;
    width: 40%;
    height: 80%;
    background-color: $secondary-color;
    border-radius: $border-radius;
    color: $background-color-light;
    font-family: Ubuntu;
    font-weight: bold;
    font-size: 29px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    display: none;

    &-title {
      margin-top: 60px;
    }

    &-img {
      width: 260px;
    }
  }

  .content {
    display: flex;

    &-item {
      &-right {
        margin-left: 54%;
      }
    }
  }
</style>
