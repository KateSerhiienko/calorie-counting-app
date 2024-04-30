<template>
  <div class="wrapper">
    <header class="header glb-header">
      <p class="greeting">Welcome to</p>
      <p class="name">Calorie Counter</p>
      <p class="slogan">Weigh More, Weigh Less</p>
    </header>

    <div class="content-wrapper">
      <p class="content-title">
        This app will help you control your diet and achieve your goals. Click
        one button below to:
      </p>
      <ul class="buttons-wrapper">
        <li
          v-for="(navItem, index) in getNav"
          :key="navItem.title"
        >
          <router-link
            :to="navItem.to"
            v-if="index !== 0"
          >
            <button
              type="button"
              class="glb-button button"
            >
              {{ navItem.title }}
            </button>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'GreetingPage',
    computed: {
      ...mapGetters(['getNav']),
    },
  };
</script>

<style
  scoped
  lang="scss"
>
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  .header {
    width: 54%;
    height: 100%;
    font-family: Amiko;
  }

  .greeting {
    margin-top: 60px;
    text-transform: initial;
    font-size: 28px;
  }

  .name {
    margin-top: 80px;
    font-family: Righteous;
    font-size: 34px;
  }

  .slogan {
    font-size: 18px;
    font-weight: normal;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 40%;
  }

  .content-title {
    margin-bottom: 20px;
  }

  .buttons-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .button {
    max-width: 90%;
  }
</style>
